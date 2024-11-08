"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccount, useReadContract, usePublicClient, useWatchContractEvent } from 'wagmi'
import { contractABI, contractAddress } from '@/app/config/contract'
import { formatEther } from "viem"
import { useEffect, useState } from "react"

interface Transaction {
    user: string
    amount: bigint
    transactionHash: string
}

// Types pour les événements
type DepositLog = {
    args: {
        user: string
        amount: bigint
    }
    transactionHash: string
}

type WithdrawLog = {
    args: {
        user: string
        amount: bigint
    }
    transactionHash: string
}

export function DashboardCard() {
    const { address } = useAccount()
    const publicClient = usePublicClient()
    const [deposits, setDeposits] = useState<Transaction[]>([])
    const [withdrawals, setWithdrawals] = useState<Transaction[]>([])
    const [balance, setBalance] = useState<bigint | undefined>()
    const [hasInitialized, setHasInitialized] = useState(false)

    // Lecture du solde
    const getBalance = async () => {
        if (!address || !publicClient) return
        try {
            const result = await publicClient.readContract({
                address: contractAddress,
                abi: contractABI,
                functionName: 'getBalanceOfUser',
                args: [address as `0x${string}`],
            })
            setBalance(result as bigint)
        } catch (error) {
            console.error('Error fetching balance:', error)
        }
    }

    // Chargement initial unique
    useEffect(() => {
        if (address && !hasInitialized) {
            getBalance()
            fetchEvents()
            setHasInitialized(true)
        }
    }, [address, hasInitialized])

    // Écouter les événements Deposit
    useWatchContractEvent({
        address: contractAddress,
        abi: contractABI,
        eventName: 'Deposit',
        onLogs: (logs) => {
            const event = logs[0] as DepositLog
            if (event.args.user === address) {
                getBalance()
                fetchEvents()
            }
        }
    })

    // Écouter les événements Withdraw
    useWatchContractEvent({
        address: contractAddress,
        abi: contractABI,
        eventName: 'Withdraw',
        onLogs: (logs) => {
            const event = logs[0] as WithdrawLog
            if (event.args.user === address) {
                getBalance()
                fetchEvents()
            }
        }
    })

    // Fonction pour mettre à jour uniquement l'historique
    const fetchEvents = async () => {
        if (!address || !publicClient) return

        try {
            // Obtenir le bloc actuel
            const currentBlock = await publicClient.getBlockNumber()
            // Calculer le bloc de départ (50000 blocs en arrière ou 0 si moins)
            const fromBlock = currentBlock - BigInt(50000) > BigInt(0) 
                ? currentBlock - BigInt(50000) 
                : BigInt(0)

            // Récupérer les dépôts
            const depositLogs = await publicClient.getContractEvents({
                address: contractAddress,
                abi: contractABI,
                eventName: 'Deposit',
                args: { user: address },
                fromBlock
            })

            const deposits = depositLogs.map(log => ({
                user: log.args.user as string,
                amount: log.args.amount as bigint,
                transactionHash: log.transactionHash
            }))

            // Récupérer les retraits
            const withdrawLogs = await publicClient.getContractEvents({
                address: contractAddress,
                abi: contractABI,
                eventName: 'Withdraw',
                args: { user: address },
                fromBlock
            })

            const withdrawals = withdrawLogs.map(log => ({
                user: log.args.user as string,
                amount: log.args.amount as bigint,
                transactionHash: log.transactionHash
            }))

            setDeposits(deposits)
            setWithdrawals(withdrawals)
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Dashboard</CardTitle>
                <CardDescription>View your current vault status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Solde actuel */}
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-bold">
                        {balance ? formatEther(balance) : "0"} ETH
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
                    </p>
                </div>

                {/* Historique des transactions */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Dépôts */}
                    <Card className="border-green-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-green-500">Recent Deposits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {deposits.length > 0 ? (
                                    deposits.map((deposit, index) => (
                                        <div 
                                            key={deposit.transactionHash} 
                                            className="text-sm p-2 bg-green-500/10 rounded-lg border border-green-500/20"
                                        >
                                            <span className="font-medium text-green-600 dark:text-green-400">
                                                +{formatEther(deposit.amount)} ETH
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No deposits yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Retraits */}
                    <Card className="border-red-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-red-500">Recent Withdrawals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {withdrawals.length > 0 ? (
                                    withdrawals.map((withdrawal, index) => (
                                        <div 
                                            key={withdrawal.transactionHash} 
                                            className="text-sm p-2 bg-red-500/10 rounded-lg border border-red-500/20"
                                        >
                                            <span className="font-medium text-red-600 dark:text-red-400">
                                                -{formatEther(withdrawal.amount)} ETH
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No withdrawals yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
} 
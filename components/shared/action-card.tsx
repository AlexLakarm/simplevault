"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { useWriteContract } from 'wagmi'
import { contractABI, contractAddress } from '@/app/config/contract'
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { parseEther } from "viem"
import { useTransactionToast } from "@/hooks/useTransactionToast"

export function ActionCard() {
    const [depositAmount, setDepositAmount] = useState<string>("")
    const [withdrawAmount, setWithdrawAmount] = useState<string>("")
    
    const { writeContract: deposit, data: depositHash, error: depositError } = useWriteContract()
    const { writeContract: withdraw, data: withdrawHash, error: withdrawError } = useWriteContract()

    useTransactionToast(depositHash, depositError)
    useTransactionToast(withdrawHash, withdrawError)

    const handleDeposit = () => {
        if (!depositAmount) return
        try {
            const valueInWei = parseEther(depositAmount)
            deposit({
                address: contractAddress,
                abi: contractABI,
                functionName: 'sendEthers',
                value: valueInWei
            })
            setDepositAmount("")
        } catch (error) {
            console.error("Error parsing amount:", error)
        }
    }

    const handleWithdraw = () => {
        if (!withdrawAmount) return
        try {
            const valueInWei = parseEther(withdrawAmount)
            withdraw({
                address: contractAddress,
                abi: contractABI,
                functionName: 'withdraw',
                args: [valueInWei]
            })
            setWithdrawAmount("")
        } catch (error) {
            console.error("Error parsing amount:", error)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Actions</CardTitle>
                <CardDescription>Manage your funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input
                        type="number"
                        placeholder="Amount in ETH"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        step="0.001"
                    />
                    <Button 
                        className="w-full flex items-center gap-2"
                        variant="outline"
                        onClick={handleDeposit}
                        disabled={!depositAmount}
                    >
                        <ArrowDownToLine className="h-4 w-4" />
                        Deposit
                    </Button>
                </div>

                <div className="space-y-2">
                    <Input
                        type="number"
                        placeholder="Amount in ETH"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        step="0.001"
                    />
                    <Button 
                        className="w-full flex items-center gap-2"
                        variant="outline"
                        onClick={handleWithdraw}
                        disabled={!withdrawAmount}
                    >
                        <ArrowUpFromLine className="h-4 w-4" />
                        Withdraw
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 
"use client"

import { usePublicClient } from 'wagmi'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import { contractAddress } from '@/app/config/contract'
import { Loader2 } from 'lucide-react'

export function TvlCard() {
    const publicClient = usePublicClient()
    const [tvl, setTvl] = useState<string>("0")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTVL = async () => {
            if (!publicClient) return
            try {
                const balance = await publicClient.getBalance({
                    address: contractAddress,
                })
                setTvl(formatEther(balance))
            } catch (error) {
                console.error('Error fetching TVL:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTVL()
        
        const interval = setInterval(fetchTVL, 10000)
        return () => clearInterval(interval)
    }, [publicClient])

    return (
        <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Value Locked</p>
            {isLoading ? (
                <div className="flex justify-end items-center h-9">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <p className="text-2xl font-bold">{tvl} ETH</p>
            )}
        </div>
    )
} 
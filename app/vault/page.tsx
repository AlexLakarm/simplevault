"use client"

import { DashboardCard } from "@/components/shared/dashboard-card"
import { ActionCard } from "@/components/shared/action-card"
import { TvlCard } from "@/components/shared/tvl-card"

const VaultApp = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Welcome to your ultimate Vault App</h1>
                    <p className="text-muted-foreground">
                        Here you can deposit and withdraw your funds and see your Vault balance in real time.
                    </p>
                </div>
                <TvlCard />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
                <DashboardCard />
                <ActionCard />
            </div>
        </div>
    )
}

export default VaultApp
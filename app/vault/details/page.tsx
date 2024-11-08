"use client"

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DetailsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <Link href="/vault">
                    <Button variant="outline" className="flex items-center gap-2 group">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Vault
                    </Button>
                </Link>
            </div>
            DetailsPage
        </div>
    )
}

export default DetailsPage;
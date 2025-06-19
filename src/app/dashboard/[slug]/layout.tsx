'use client'

import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import pocketStore from "@/features/pocket/stores/pocket.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pocket, getDetailPocket } = detailPocketStore();
  const { pockets, selectedPocket, getAllPockets } = pocketStore();
  const pathname = usePathname();

  useEffect(() => {
    if (!pockets.length || !selectedPocket) {
      getAllPockets();
      return;
    }
    
    if (pocket === null || pocket.id !== selectedPocket.id) {
      getDetailPocket(selectedPocket.id)
    }

  }, [selectedPocket, pathname]);

  return children
}
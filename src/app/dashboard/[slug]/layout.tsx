'use client'

import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import pocketStore from "@/features/pocket/stores/pocket.store";
import Loading from "@/features/shared/components/loading.component";
import { Container, Box } from "@mui/material";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pocket, getDetailPocket } = detailPocketStore();
  const { isLoading, selectedPocket } = pocketStore();

  useEffect(() => {
    if (!selectedPocket) {
      return
    }

    if (!pocket || pocket?.id !== selectedPocket?.id) {
      getDetailPocket(selectedPocket.id)
    }
  }, [selectedPocket]);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            minHeight: '70vh',
          }}
        >
          <Loading />
        </Box>
      </Container>
    );
  }

  return children
}
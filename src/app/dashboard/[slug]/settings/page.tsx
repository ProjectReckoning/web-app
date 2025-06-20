"use client";

import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/features/shared/components/loading.component";
import Box from "@mui/material/Box";
import PocketCard from "@/features/pocket/components/pocket-card.component";
import FormEditPocket from "@/features/pocket/components/form-edit-pocket.component";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export default function Page() {
  const { isLoading, pocket } = detailPocketStore();
  const [formData, setFormData] = useState({
    title: pocket?.name,
    color: pocket?.color,
    icon: pocket?.icon,
  });

  useEffect(() => {
    if (pocket) {
      setFormData({
        title: pocket.name,
        color: pocket.color,
        icon: pocket.icon,
      });
    }
  }, [pocket]);

  const handlePocketChange = (data: {
    title: string;
    color: string;
    icon: string;
  }) => {
    setFormData(data);
  };

  if (isLoading || !pocket) {
    return (
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        my: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "stretch",
        gap: 8,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        flexWrap="wrap"
        gap={2}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            flex: 1,
            flexDirection:"column"
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Atur Pocket Kamu
          </Typography>
          <PocketCard
            title={formData.title}
            accountNumber={pocket.accountNumber}
            balance={pocket.balance}
            color={formData.color}
            showBalance={false}
            icon={formData?.icon ? formData.icon : pocket.icon}
            sx={{
              backgroundColor: formData.color,
              borderRadius: 4,
              padding: 3,
              paddingRight: {
                xs: 8,
                lg: 16,
              },
              marginRight: {
                xs: 0,
                lg: 16,
              },
            }}
            minWidth={300}
            flex={1}
          />
        </Box>
        <FormEditPocket
          defaultTitle={pocket.name}
          defaultColor={pocket.color}
          defaultIcon={pocket.icon}
          onSave={() => console.log("Simpan perubahan")}
          onChange={handlePocketChange}
          sx={{
            flex: 1,
            minWidth: 300,
            // maxWidth: 400,
          }}
        />
      </Box>
    </Box>
  );
}

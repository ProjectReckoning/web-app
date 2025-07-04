"use client";

import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PocketCard from "@/features/pocket/components/pocket-card.component";
import FormEditPocket from "@/features/pocket/components/form-edit-pocket.component";
import Typography from "@mui/material/Typography";
import pocketStore from "@/features/pocket/stores/pocket.store";
import { PocketMemberRole } from "@/features/pocket/entities/detail-pocket.entities";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isLoading, pocket, updatePocket } = detailPocketStore();
  const { getAllPockets } = pocketStore();
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: pocket?.name,
    color: pocket?.color,
    icon: pocket?.icon,
  });

  useEffect(() => {
    if (!pocket) {
      return
    }

    setFormData({
      title: pocket.name,
      color: pocket.color,
      icon: pocket.icon,
    });

    if (pocket.userRole !== PocketMemberRole.Owner) {
      router.push(`/dashboard/${pocket.id}`)
    }

  }, [pocket]);

  const handlePocketUpdate = async () => {
    if (!formData.title || !formData.color || !formData.icon) {
      return;
    }
    await updatePocket({
      name: formData.title,
      color: formData.color,
      icon: formData.icon,
    });
    await getAllPockets()
  }

  const handlePocketChange = (data: {
    title: string;
    color: string;
    icon: string;
  }) => {
    setFormData(data);
  };

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
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Atur Pocket Kamu
          </Typography>
          <PocketCard
            isLoading={isLoading || !pocket?.id}
            title={formData.title}
            accountNumber={pocket?.accountNumber ?? ""}
            balance={pocket?.balance ?? 0}
            color={formData.color}
            showBalance={false}
            icon={formData?.icon ? formData.icon : pocket?.icon ?? ""}
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
          isLoading={isLoading}
          defaultTitle={pocket?.name ?? ""}
          defaultColor={pocket?.color ?? ""}
          defaultIcon={pocket?.icon ?? ""}
          onChange={handlePocketChange}
          onSave={handlePocketUpdate}
          sx={{
            flex: 1,
            minWidth: 300,
          }}
        />
      </Box>
    </Box>
  );
}

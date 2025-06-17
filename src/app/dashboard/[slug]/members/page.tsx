'use client';

import PocketMembersTable, { PocketMembersTableRow } from "@/features/pocket/components/pocket-members-table.component";
import { PocketMemberRole } from "@/features/pocket/entities/detail-pocket.entities";
import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import { limeGreen, orange, tosca } from "@/lib/custom-color";
import { Icon } from "@iconify/react";
import { Button, IconButton, Stack, Typography } from "@mui/material";

export default function Page() {
  const { pocket, getAllMembers } = detailPocketStore();

  const owners = getAllMembers(PocketMemberRole.Owner);
  const admins = getAllMembers(PocketMemberRole.Admin);
  const members = getAllMembers(PocketMemberRole.Member);

  const adminData: PocketMembersTableRow[] = [...admins, ...owners].map(member => {
    const data: PocketMembersTableRow = {
      fullName: member.name,
      role: member.metadata?.role ?? PocketMemberRole.Member,
      color: member.metadata?.role === PocketMemberRole.Owner ? orange[300] : tosca[300],
      iconName: "mdi:crown",
    }

    if (pocket?.userRole === PocketMemberRole.Owner) {
      data.actions = <>
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="bi:trash" /></IconButton>
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="ph:pencil-simple-bold" /></IconButton>
      </>;
    }

    // TODO: Compare member.id with current user id
    if (pocket?.userRole !== PocketMemberRole.Owner && member.id === 3) {
      data.actions = <>
        <Button color="gray" startIcon={<Icon icon="material-symbols:door-open-outline" />} size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}>Keluar dari pocket ini</Button>
      </>;
    }

    return data;
  });

  const memberData: PocketMembersTableRow[] = members.map(member => {
    const data: PocketMembersTableRow = {
      fullName: member.name,
      role: member.metadata?.role ?? PocketMemberRole.Member,
      color: limeGreen[300],
      iconName: "mdi:account",
    }

    if (pocket?.userRole === PocketMemberRole.Owner || pocket?.userRole === PocketMemberRole.Admin) {
      data.actions = <>
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="bi:trash" /></IconButton>
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="ph:pencil-simple-bold" /></IconButton>
      </>;
    }

    // TODO: Compare member.id with current user id
    if (member.id === 3) {
      data.actions = <>
        <Button color="gray" startIcon={<Icon icon="material-symbols:door-open-outline" />} size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}>Keluar dari pocket ini</Button>
      </>;
    }

    return data;
  });

  return (
    <Stack
      sx={{
        my: 8,
      }}
      spacing={4}
    >
      <Typography variant='h5' fontWeight="bold">
        Atur Anggota Kamu
      </Typography>

      <PocketMembersTable
        data={adminData}
        title="Admin"
        color="tosca.light"
      />

      <PocketMembersTable
        data={memberData}
        title="Member"
        color="limeGreen.light"
        paddingTop={4}
        useSearch
      />
    </Stack>
  );
}
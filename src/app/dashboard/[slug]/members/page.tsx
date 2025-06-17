'use client';

import PocketMembersTable, { PocketMembersTableRow } from "@/features/pocket/components/pocket-members-table.component";
import { PocketMemberRole } from "@/features/pocket/entities/detail-pocket.entities";
import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import Modal from "@/features/shared/components/modal";
import { modalStore } from "@/features/shared/store/modal.store";
import { limeGreen, orange, tosca } from "@/lib/custom-color";
import { Icon } from "@iconify/react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

export default function Page() {
  const { pocket, getAllMembers } = detailPocketStore();

  const { openModal } = modalStore();

  const onRemoveMemberClicked = () => {
    openModal(<RemoveMemberConfirmationModalContent />);
  }
  const onLeavePocketClicked = () => {
    openModal(<LeavePocketConfirmationModalContent />);
  }

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
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="bi:trash" onClick={onRemoveMemberClicked} /></IconButton>
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="ph:pencil-simple-bold" /></IconButton>
      </>;
    }

    // TODO: Compare member.id with current user id
    if (pocket?.userRole !== PocketMemberRole.Owner && member.id === 3) {
      data.actions = <>
        <Button color="gray" startIcon={<Icon icon="material-symbols:door-open-outline" />} size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }} onClick={onLeavePocketClicked}>Keluar dari pocket ini</Button>
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
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="bi:trash" onClick={onRemoveMemberClicked} /></IconButton>
        <IconButton color="gray" size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }}><Icon icon="ph:pencil-simple-bold" /></IconButton>
      </>;
    }

    // TODO: Compare member.id with current user id
    if (member.id === 3) {
      data.actions = <>
        <Button color="gray" startIcon={<Icon icon="material-symbols:door-open-outline" />} size="small" sx={{ textTransform: 'none', border: 2, borderColor: 'border.main', borderRadius: 2 }} onClick={onLeavePocketClicked}>Keluar dari pocket ini</Button>
      </>;
    }

    return data;
  });

  return (
    <>
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
      <Modal />
    </>
  );
}

function RemoveMemberConfirmationModalContent() {
  const { closeModal } = modalStore();

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      spacing={2}
    >
      <Box component="img" src="/images/remove-member-confirmation-illustration.png" alt="Remove Member" sx={{ width: "80%" }} />
      <Box paddingTop={2}>
        <Typography variant="h5" fontWeight={600} component="h2" textAlign="center">
          <Box component="span">Apakah kamu yakin menghapus {' '}</Box>
          <Box component="span" borderBottom={4} borderColor="tosca.main" borderRadius={1}>member?</Box>
        </Typography>
        <Typography variant="h6" component="h2" marginTop={1} textAlign="center">
          Aksi tidak bisa dipulihkan ya!
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} sx={{ width: '100%', paddingTop: 2, justifyContent: 'center' }}>
        <Button variant="contained" color="error" size="large" sx={{ width: '50%', }}>Hapus Member</Button>
        <Button variant="outlined" color="black" size="large" sx={{ width: '50%', }} onClick={closeModal}>Batalkan</Button>
      </Stack>
    </Stack>
  );
}

function LeavePocketConfirmationModalContent() {
  const { closeModal } = modalStore();

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      spacing={2}
    >
      <Box component="img" src="/images/remove-member-confirmation-illustration.png" alt="Remove Member" sx={{ width: "80%" }} />
      <Box paddingTop={2}>
        <Typography
          variant="h5"
          fontWeight={600}
          component="h2"
          lineHeight={2}
          textAlign="center"
          sx={{
            fontSize: {
              xs: '1rem',
              sm: 'inherit',
            }
          }}
        >
          <Box component="span">Apakah kamu yakin {' '}</Box>
          <Box component="span" borderBottom={4} borderColor="tosca.main" borderRadius={1} sx={{ whiteSpace: "nowrap" }}>keluar dari Pocket ini?</Box>
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          marginTop={1}
          textAlign="center"
          sx={{
            fontSize: {
              xs: '1rem',
              sm: 'inherit',
            }
          }}
        >
          Aksi tidak bisa dipulihkan ya!
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2} sx={{ paddingTop: 4, justifyContent: 'center' }}>
        <Button variant="contained" color="error" size="large" sx={{ flex: 1, minWidth: 160 }}>Keluar Pocket</Button>
        <Button variant="outlined" color="black" size="large" sx={{ flex: 1, minWidth: 160 }} onClick={closeModal}>Batal</Button>
      </Box>
    </Stack>
  );
}
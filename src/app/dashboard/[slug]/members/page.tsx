"use client";

import authStore from "@/features/auth/stores/auth.store";
import PocketMembersTable, {
  PocketMembersTableRow,
} from "@/features/pocket/components/pocket-members-table.component";
import { PocketMemberRole } from "@/features/pocket/entities/detail-pocket.entities";
import detailPocketStore from "@/features/pocket/stores/detail-pocket.store";
import Modal from "@/features/shared/components/modal";
import { modalStore } from "@/features/shared/store/modal.store";
import { limeGreen, orange, tosca } from "@/lib/custom-color";
import { Icon } from "@iconify/react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Theme, useMediaQuery } from "@mui/material";

export default function Page() {
  const { pocket, getAllMembers, isLoading } = detailPocketStore();
  const { user } = authStore();

  const { openModal } = modalStore();
  const [editableKey, setEditableKey] = useState<string | null>(null);

  const onRemoveMemberClicked = () => {
    openModal(<RemoveMemberConfirmationModalContent />);
  };
  const onLeavePocketClicked = () => {
    openModal(<LeavePocketConfirmationModalContent />);
  };

  const owners = getAllMembers(PocketMemberRole.Owner);
  const admins = getAllMembers(PocketMemberRole.Admin);
  const members = getAllMembers(PocketMemberRole.Member);

  const editEditableKey = (key: string) => {
    if (editableKey === key) {
      setEditableKey(null);
      return;
    }

    setEditableKey(key);
  };
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const ownerData: PocketMembersTableRow[] = owners.map((member) => {
    const data: PocketMembersTableRow = {
      key: member.id.toString(),
      fullName: member.name,
      role: member.metadata?.role ?? PocketMemberRole.Owner,
      color: orange[300],
      iconName: "mdi:crown",
    };

    if (
      pocket?.userRole === PocketMemberRole.Owner ||
      pocket?.userRole === PocketMemberRole.Admin
    ) {
      data.actions = (
        <>
          <IconButton
            color="gray"
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
          >
            <Icon icon="bi:trash" onClick={onRemoveMemberClicked} />
          </IconButton>
          <IconButton
            color="gray"
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
            onClick={() => editEditableKey(member.id.toString())}
          >
            <Icon icon="ph:pencil-simple-bold" />
          </IconButton>
        </>
      );
    }

    if (member.id.toString() === user?.id) {
      data.actions = <></>;
    }

    return data;
  });

  const adminData: PocketMembersTableRow[] = admins.map((member) => {
    const data: PocketMembersTableRow = {
      key: member.id.toString(),
      fullName: member.name,
      role: member.metadata?.role ?? PocketMemberRole.Owner,
      color:
        member.metadata?.role === PocketMemberRole.Owner
          ? orange[300]
          : tosca[300],
      iconName: "mdi:crown",
    };

    if (
      member.id.toString() !== user?.id &&
      pocket?.userRole === PocketMemberRole.Owner
    ) {
      data.actions = (
        <>
          <IconButton
            color="gray"
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
          >
            <Icon icon="bi:trash" onClick={onRemoveMemberClicked} />
          </IconButton>
          <IconButton
            color="gray"
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
            onClick={() => editEditableKey(member.id.toString())}
          >
            <Icon icon="ph:pencil-simple-bold" />
          </IconButton>
        </>
      );
    }

    if (member.id.toString() === user?.id) {
      data.actions = (
        <>
          <Button
            color="gray"
            startIcon={<Icon icon="material-symbols:door-open-outline" />}
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
            onClick={onLeavePocketClicked}
          >
            Keluar dari pocket ini
          </Button>
        </>
      );
    }

    return data;
  });

  const memberData: PocketMembersTableRow[] = members.map((member) => {
    const data: PocketMembersTableRow = {
      key: member.id.toString(),
      fullName: member.name,
      role: member.metadata?.role ?? PocketMemberRole.Member,
      color: limeGreen[300],
      iconName: "mdi:account",
    };

    if (
      pocket?.userRole === PocketMemberRole.Owner ||
      pocket?.userRole === PocketMemberRole.Admin
    ) {
      data.actions = (
        <>
          <IconButton
            color="gray"
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
          >
            <Icon icon="bi:trash" onClick={onRemoveMemberClicked} />
          </IconButton>
          <IconButton
            color="gray"
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
            }}
            onClick={() => editEditableKey(member.id.toString())}
          >
            <Icon icon="ph:pencil-simple-bold" />
          </IconButton>
        </>
      );
    }

    if (member.id.toString() === user?.id) {
      data.actions = (
        <>
          <Button
            color="gray"
            startIcon={<Icon icon="material-symbols:door-open-outline" />}
            // make the icon is center
            size="small"
            sx={{
              textTransform: "none",
              border: 2,
              borderColor: "border.main",
              borderRadius: 2,
              ...(isMobile && {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }),
            }}
            onClick={onLeavePocketClicked}
          >
            {!isMobile && "Keluar dari pocket ini"}
          </Button>
        </>
      );
    }

    return data;
  });

  const onRoleEdited = (key: string, newRole: PocketMemberRole) => {
    console.log(`Role for member with key ${key} changed to ${newRole}`);
    setEditableKey(null);
  };

  return (
    <>
      <Typography variant="h5">Atur Anggota Kamu</Typography>

      <PocketMembersTable
        data={[...ownerData, ...adminData]}
        title="Admin"
        color="tosca.light"
        editableKey={editableKey}
        onRoleEdited={onRoleEdited}
        mt={8}
        isLoading={isLoading || !pocket?.id}
      />

      <PocketMembersTable
        data={memberData}
        title="Member"
        color="limeGreen.light"
        paddingTop={4}
        useSearch
        editableKey={editableKey}
        onRoleEdited={onRoleEdited}
        mt={8}
        isLoading={isLoading || !pocket?.id}
      />
      <Modal />
    </>
  );
}

function RemoveMemberConfirmationModalContent() {
  const { closeModal } = modalStore();

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Box
        component="img"
        src="/images/remove-member-confirmation-illustration.png"
        alt="Remove Member"
        sx={{ width: "100%" }}
      />
      <Box paddingTop={2}>
        <Typography fontWeight={600} component="h3" textAlign="center">
          <Box component="span">Apakah kamu yakin menghapus </Box>
          <Box
            component="span"
            borderBottom={4}
            borderColor="tosca.main"
            borderRadius={1}
          >
            member?
          </Box>
        </Typography>
        <Typography component="h4" marginTop={1} textAlign="center">
          Aksi tidak bisa dipulihkan ya!
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", paddingTop: 2, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{
            width: { xs: "100%", sm: "50%" },
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            py: { xs: 0.5, sm: 1 },
          }}
        >
          Hapus Member
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={closeModal}
          sx={{
            width: { xs: "100%", sm: "50%" },
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            py: { xs: 0.5, sm: 1 },
            mt: { xs: -1, sm: -2 }, 
          }}
        >
          Batalkan
        </Button>{" "}
      </Stack>
    </Stack>
  );
}

function LeavePocketConfirmationModalContent() {
  const { closeModal } = modalStore();

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      <Box
        component="img"
        src="/images/remove-member-confirmation-illustration.png"
        alt="Remove Member"
        sx={{ width: "80%" }}
      />
      <Box paddingTop={2}>
        <Typography
          variant="h5"
          fontWeight={600}
          component="h2"
          lineHeight={2}
          textAlign="center"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "inherit",
            },
          }}
        >
          <Box component="span">Apakah kamu yakin </Box>
          <Box
            component="span"
            borderBottom={4}
            borderColor="tosca.main"
            borderRadius={1}
            sx={{ whiteSpace: "nowrap" }}
          >
            keluar dari Pocket ini?
          </Box>
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          marginTop={1}
          textAlign="center"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "inherit",
            },
          }}
        >
          Aksi tidak bisa dipulihkan ya!
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        sx={{ paddingTop: 2, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{
            flex: 1,
            minWidth: 160,
            width: { xs: "100%", sm: "50%" },
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            py: { xs: 0.5, sm: 1 },
          }}
        >
          Keluar Pocket
        </Button>
        <Button
          variant="outlined"
          color="black"
          size="large"
          sx={{
            flex: 1,
            minWidth: 160,
            width: { xs: "100%", sm: "50%" },
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            py: { xs: 0.5, sm: 1 },
          }}
          onClick={closeModal}
        >
          Batal
        </Button>
      </Box>
    </Stack>
  );
}

// components/ModalRenderer.tsx
import { Dialog, DialogContent } from "@mui/material";
import { modalStore } from "../store/modal.store";

export default function Modal({ children }: { children?: React.ReactNode }) {
  const { isOpen, closeModal, content } = modalStore();

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 8,
            boxShadow: "none",
            padding: {
              xs: 0,
              sm: 2,
            },
            backgroundColor: "background.paper",
          },
        },
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <DialogContent>{content || children}</DialogContent>
    </Dialog>
  );
}

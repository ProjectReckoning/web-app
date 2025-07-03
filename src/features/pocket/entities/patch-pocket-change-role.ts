export type ChangePocketMemberRoleResponse = {
    ok: boolean;
    code: number;
    message: string;
    data: {
      message: string;
      updatedMember: {
        user_id: number;
        new_role: string;
      };
    };
  };
  
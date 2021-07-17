import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { UserCard } from "../organisms/layout/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/layout/user/UserDetailModal";
import { useSelectUsers } from "../../hooks/useSelectUsers";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { onSelectUser, selectedUser } = useSelectUsers();
  const { loginUser } = useLoginUser();
  useEffect(() => getUsers(), []);
  const onCLickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
      onOpen();
    },
    [users]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onCLickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        isAdmin={loginUser?.isAdmin}
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});

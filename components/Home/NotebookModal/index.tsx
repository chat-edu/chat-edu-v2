import React from 'react';

import {
    Button,
    Flex, Heading, HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text, VStack
} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";
import Link from "next/link";
import NotebookTags from "@/components/NotebookUtilities/NotebookTags";
import NotebookLeaderboard from "@/components/NotebookUtilities/NotebookLeaderboard";
import NotesDisplay from "@/components/Home/NotebookModal/NotesDisplay";
import useNotebookRank from "@/hooks/queries/notebook/useNotebookRank";
import UsernameText from "@/components/Utilities/UsernameText";


interface Props {
    notebook: Notebook,
    isOpen: boolean,
    onClose: () => void
}

const NotebookModal: React.FC<Props> = ({ notebook, isOpen, onClose }) => {

    const { notebookRank, loading } = useNotebookRank(notebook.id);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior={'inside'}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    pt={8}
                >
                    <HStack
                        justify={'space-between'}
                        w={'100%'}
                    >
                        <VStack
                            align={'start'}
                        >
                            <NotebookTags
                                notebookId={notebook.id}
                            />
                            <Heading
                                size={{
                                    base: 'md',
                                    md: 'lg'
                                }}
                            >
                                {notebook.name}
                            </Heading>
                            <Text
                                fontSize={'sm'}
                                opacity={0.7}
                            >
                                By<UsernameText username={notebook.username} id={notebook.userId} />
                            </Text>
                        </VStack>
                        {
                            (!loading && notebookRank) && (
                                <VStack
                                    align={'end'}
                                >
                                    <Text
                                        fontSize={'md'}
                                        color={'brand.500'}
                                    >
                                        Rank: #{notebookRank.rank}
                                    </Text>
                                    <Text
                                        fontSize={'md'}

                                    >
                                        Total Score: {notebookRank.totalScore}
                                    </Text>
                                </VStack>
                            )
                        }
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction={'column'}
                        gap={4}
                    >
                        <NotesDisplay
                            notebook={notebook}
                        />
                        <NotebookLeaderboard
                            notebookId={notebook.id}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Link
                        href={`/notebook/${notebook.id}`}
                        style={{
                            width: '100%'
                        }}
                    >
                        <Button
                            colorScheme={'brand'}
                            w={'100%'}
                        >
                            Start Studying
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NotebookModal;
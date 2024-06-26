import React from 'react';

import {Card, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import AddEnrollmentModal from "@/components/AddModals/AddEnrollment/index";

import {transparentize} from "@chakra-ui/theme-tools";

const AddEnrollmentCard = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const hoverBackground = transparentize(useColorModeValue('brand.50', 'brand.200'), 0.25);

    return (
        <>
            <Card
                cursor={'pointer'}
                _hover={{
                    bg: hoverBackground
                }}
                onClick={onOpen}
                transition={'all 0.2s ease-in-out'}
                borderWidth={{
                    base: 2,
                    md: 3
                }}
                borderColor={'brand.400'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={4}
            >
                <AddIcon
                    boxSize={6}
                />
                <Text
                    fontWeight={'bold'}
                    fontSize={{
                        base: 'md',
                        md: 'lg'
                    }}
                >
                    Enroll in a Class
                </Text>
            </Card>
            <AddEnrollmentModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default AddEnrollmentCard;

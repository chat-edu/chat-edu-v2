import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Flex,
} from '@chakra-ui/react'

import TextareaInput from "@/components/Utilities/TextareaInput";
import TextInput from "@/components/Utilities/TextInput";
import SubjectMenu from "@/components/Utilities/SubjectMenu";

import useAddNote from "@/hooks/mutators/useAddNote";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const UploadModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { values, setFieldValue, touched, setFieldTouched, submitForm, errors } = useAddNote();

    const onSubmit = async () => {
        await submitForm();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Notes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction={'column'}
                        gap={4}
                    >
                        <SubjectMenu
                            label={"Course"}
                            course={null}
                            setCourse={(course) => {setFieldValue('courseId', course?.id)}}
                            onBlur={() => setFieldTouched('courseId', true)}
                            error={touched.courseId && errors.courseId || undefined}
                        />
                        <TextInput
                            label={"Title"}
                            placeholder={"Enter your title here..."}
                            value={values.title}
                            onChange={(title) => setFieldValue('title', title)}
                            onBlur={() => setFieldTouched('title', true)}
                            error={touched.title && errors.title || undefined}
                        />
                        <TextareaInput
                            label={"Notes"}
                            placeholder={"Enter your notes here..."}
                            value={values.content}
                            onChange={(content) => setFieldValue('content', content)}
                            onBlur={() => setFieldTouched('content', true)}
                            error={touched.content && errors.content || undefined}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={'brand'}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UploadModal;
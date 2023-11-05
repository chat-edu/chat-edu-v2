import React from 'react';

import {Button, HStack, Text} from "@chakra-ui/react";

import {TextBasedQuestion as TextBasedQuestionType} from "@/types/prompts/TextBasedQuestion";

interface Props {
    textBasedQuestion: TextBasedQuestionType,
    askForHint: () => void,
    answered: boolean
}

const TextBasedQuestion: React.FC<Props> = ({ textBasedQuestion, askForHint, answered }) => {
    return (
        <HStack
            w={'100%'}
        >
            <Text
                flex={1}
                fontSize={{
                    base: 'xs',
                    md: 'md'
                }}
                fontWeight={'bold'}
            >
                {textBasedQuestion.question}
            </Text>
            <Button
                variant={'outline'}
                colorScheme={'brand'}
                onClick={askForHint}
                isDisabled={answered}
            >
                Hint
            </Button>
        </HStack>
    );
};

export default TextBasedQuestion;

import React, { useState } from 'react';

import {Button, HStack, Text, VStack} from "@chakra-ui/react";

import {MultipleChoiceQuestion as MultipleChoiceQuestionType} from "@/types/MultipleChoiceQuestion";

interface Props {
    question: MultipleChoiceQuestionType,
    onAnswer: (answer: string) => void,
    askForHint: () => void
    answered: boolean
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question, onAnswer, askForHint, answered }) => {

    console.log(question);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const onClick = (option: string, index: number) => {
        if(selectedIndex == null) {
            setSelectedIndex(index);
            onAnswer(option);
        }
    }

    const buttonColorScheme = (index: number) => (
        selectedIndex == index
            ? (index == question.answerIndex ? 'green' : 'red')
            : undefined
    )

    return (
        <HStack
            w={'100%'}
            spacing={4}
        >
            <VStack
                w={'100%'}
                alignItems={'flex-start'}
                flex={1}
            >
                <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                >
                    {question.question}
                </Text>
                <VStack
                    w={'100%'}
                >
                    {
                        question.options.map((option, index) => (
                            <Button
                                variant={'outline'}
                                key={index}
                                maxW={'100%'}
                                w={'100%'}
                                wordBreak={'break-word'}
                                whiteSpace="normal"
                                h={'auto'}
                                py={2}
                                textAlign={'left'}
                                justifyContent={'flex-start'}
                                fontWeight={'normal'}
                                colorScheme={buttonColorScheme(index)}
                                onClick={() => onClick(option, index)}
                                isDisabled={answered}
                            >
                                {option}
                            </Button>
                        ))
                    }
                </VStack>
            </VStack>
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

export default MultipleChoiceQuestion;

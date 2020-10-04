/* eslint-disable */
// @ts-nocheck
/* eslint-enable */
import { Box, Button, Kbd, Text, useColorMode } from '@chakra-ui/core';
import React, { useEffect, useRef } from 'react';
import { submitOnMetaEnter, submitOnShiftEnter } from '../utils/keyboard';
import ReactDiffViewer from 'react-diff-viewer';
import { Textarea } from '../forms/base';
import { colors } from '../themes/neonLaw';
import { useForm } from 'react-hook-form';
import { useIntl } from 'gatsby-plugin-intl';
import { useLocalStorage } from '../utils/useLocalStorage';
import { useOS } from '../utils/useOS';

interface FlashcardProps {
  prompt: string;
  answer: string;
  visible: boolean;
  key: number;
  showAnswer: boolean;
  toggleShowAnswer: any;
}

export const Flashcard = ({
  prompt,
  answer,
  showAnswer,
  visible,
  key,
  toggleShowAnswer,
}: FlashcardProps) => {
  const intl = useIntl();
  const { colorMode } = useColorMode();
  const { handleSubmit, register } = useForm();
  const OS = useOS();

  const localStorageKey = `flashcard-${key}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [userAnswer, changeUserAnswer] = useLocalStorage(localStorageKey, '');

  const onSubmit = ({ userAnswer }) => {
    changeUserAnswer(userAnswer);
    toggleShowAnswer(true);
  };

  const keyDownHandler = (e: any) => {
    if (OS === 'Mac OS') {
      submitOnMetaEnter(e, formRef);
    } else {
      submitOnShiftEnter(e, formRef);
    }
  };

  useEffect(() => {
    const flashcardDOMSelector = document.querySelector(`.${localStorageKey}`);

    flashcardDOMSelector.addEventListener('keydown', keyDownHandler, false);

    return () => {
      flashcardDOMSelector.removeEventListener(
        'keydown',
        keyDownHandler,
        false,
      );
    };
  }, [keyDownHandler, localStorageKey]);

  return (
    <Box
      display={visible ? '!inherit' : 'none'}
      cursor="pointer"
      className={localStorageKey}
      border="1px"
      borderRadius="0.5em"
      padding="2em"
    >
      {!showAnswer ? (
        <>
          <Text className fontSize="1.2em" marginBottom="1em">
            {prompt}
          </Text>
          <form
            onSubmit={handleSubmit(onSubmit as any)}
            style={{ color: colors.text[colorMode] }}
            ref={formRef}
          >
            <Textarea
              size="xl"
              name="userAnswer"
              value={userAnswer}
              register={register({
                required: intl.formatMessage({
                  id: 'forms.answer.required',
                }),
              })}
            />
            <Button marginTop="1em" type="submit">
              Show Answer &nbsp;
              <Kbd border="1px solid #bbb" color="black">
                CMD
              </Kbd>
              &nbsp; + &nbsp;
              <Kbd border="1px solid #bbb" color="black">
                Enter
              </Kbd>
            </Button>
          </form>
        </>
      ) : (
        <>
          <Text fontSize="1.2em" marginBottom="1em">
            {prompt}
          </Text>
          {answer === userAnswer ? (
            <Text>You got it!</Text>
          ) : (
            <ReactDiffViewer
              oldValue={answer}
              newValue={userAnswer}
              hideLineNumbers={true}
              showDiffOnly={false}
              splitView={false}
              useDarkTheme={colorMode === 'dark'}
            />
          )}
          <Button
            marginTop="1em"
            className="show-prompt"
            onClick={() => toggleShowAnswer(false)}
          >
            Try Typing the Answer
          </Button>
        </>
      )}
    </Box>
  );
};

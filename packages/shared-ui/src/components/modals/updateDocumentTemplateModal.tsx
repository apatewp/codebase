import {
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  theme,
  useColorMode,
} from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { colors, gutters } from '../../themes/neonLaw';
import { submitOnMetaEnter, submitOnShiftEnter } from '../../utils/keyboard';
import {
  useDeleteDocumentTemplateByIdMutation,
  useUpdateDocumentTemplateByIdMutation,
} from '../../utils/api';
import { FlashButton } from '../button';
import { StringInput } from '../inputs';
import { SubmissionInProgress } from '../submission-in-progress';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useIntl } from 'gatsby-plugin-intl';
import { useOS } from '../../utils/useOS';

interface UpdateDocumentTemplateModalProps {
  isOpen: boolean;
  onClose(): void;
  currentRow: any;
}

const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  flex-direction: column;

  & > * {
    &:not(:last-of-type) {
      margin-bottom: ${gutters.xSmallOne};
    }
  }
`;

export const UpdateDocumentTemplateModal = ({
  isOpen,
  onClose,
  currentRow,
}: UpdateDocumentTemplateModalProps) => {
  const intl = useIntl();
  const { id, prompt } = currentRow?.values || {};

  const [
    updateDocumentTemplate, { loading }
  ] = useUpdateDocumentTemplateByIdMutation();

  const [
    deleteDocumentTemplateMutation,
    { loading: deleteInProgress },
  ] = useDeleteDocumentTemplateByIdMutation({
    update(cache) {
      cache.modify({
        fields: {
          allDocumentTemplates(_, { DELETE }) {
            return DELETE;
          },
        },
      });
    },
  });

  const { handleSubmit, errors, register, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [focus, setFocus] = useState(false);
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const OS = useOS();

  const onSubmit = async ({ name, javascriptModule }) => {
    await updateDocumentTemplate({
      variables: { id, javascriptModule, name },
    })
      .then(async () => {
        setFormError('');
        await reset();
        onClose();

        setIsSubmitting(false);
      })
      .catch((apiErrors) => {
        console.log(apiErrors.graphQLErrors);
        setFormError(apiErrors.message);
        setIsSubmitting(false);
      });
  };

  const keyDownHandler = (e: any) => {
    if (OS === 'Mac OS') {
      submitOnMetaEnter(e, formRef);
    } else {
      submitOnShiftEnter(e, formRef);
    }
  };

  const handleDPress = async (e) => {
    if (isOpen && !focus && e.key === 'd') {
      await deleteDocumentTemplate();
    }
  };

  const deleteDocumentTemplate = async () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete the question?',
    );

    if (confirmDelete) {
      await deleteDocumentTemplateMutation({ variables: { id } });
      setIsDeleting(false);
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleDPress);

    const textArea = document.querySelector('.answer');

    if (null !== textArea) {
      textArea.addEventListener('keydown', keyDownHandler);
    }
    return () => {
      window.removeEventListener('keypress', handleDPress);

      if (null !== textArea) {
        textArea.removeEventListener('keydown', keyDownHandler);
      }
    };
  });

  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay>
        <ModalContent
          data-testid="update-document-template-modal"
          margin="8em 2em 0 2em"
        >
          <ModalHeader
            fontWeight="normal"
            fontSize={theme.fontSizes['xl0']}
            color={colors.text[colorMode]}
          >
            Update DocumentTemplate
          </ModalHeader>
          <ModalCloseButton style={{ color: colors.text[colorMode] }} />
          <form
            onSubmit={handleSubmit(onSubmit as any)}
            style={{ color: colors.text[colorMode] }}
            ref={formRef}
          >
            <ModalBody>
              {formError}
              <StringInput
                name="prompt"
                testId="update-question-modal-prompt"
                label={intl.formatMessage({ id: 'forms.prompt.label' })}
                errors={errors}
                onFocus={() => { setFocus(true); }}
                onBlur={() => { setFocus(false); }}
                value={prompt}
                placeholder={intl.formatMessage({
                  id: 'forms.prompt.placeholder',
                })}
                register={register({
                  required: intl.formatMessage({ id: 'forms.prompt.required' }),
                })}
                styles={{ marginBottom: gutters.xSmallOne }}
              />
            </ModalBody>

            <StyledModalFooter>
              <FlashButton
                type="submit"
                data-testid="update-document-template-modal-submit"
                isDisabled={
                  isSubmitting || isDeleting || loading || deleteInProgress
                }
                containerStyles={{
                  margin: `${gutters.xSmallOne} 0`,
                  width: '100%',
                }}
                styles={{width: '100%'}}
                colorScheme="teal"
              >
                Update DocumentTemplate &nbsp;
                <Kbd border="1px solid #bbb" color="black">
                  Shift
                </Kbd>
                &nbsp;+ &nbsp;
                <Kbd border="1px solid #bbb" color="black">
                  Enter
                </Kbd>
                <SubmissionInProgress loading={loading} />
              </FlashButton>
              <FlashButton
                data-testid="update-document-template-modal-delete-button"
                isDisabled={
                  isSubmitting || isDeleting || loading || deleteInProgress
                }
                containerStyles={{width: '100%'}}
                styles={{width: '100%'}}
                onClick={async () => {
                  setIsDeleting(true);
                  await deleteDocumentTemplate();
                }}
                colorScheme="red"
              >
                Delete DocumentTemplate &nbsp;
                <Kbd border="1px solid #bbb" color="black">
                  D
                </Kbd>
                <SubmissionInProgress loading={deleteInProgress} />
              </FlashButton>
            </StyledModalFooter>
          </form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
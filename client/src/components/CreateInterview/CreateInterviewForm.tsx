import {
    Button,
    Column,
    Form,
    Grid,
    InlineLoading,
    Row,
    TextArea,
    TextInput,
} from 'carbon-components-react';
import { Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useIcreateInterviewMutation } from '../../generated/graphql';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const TextInputProps = {
    id: 'experience',
    labelText: 'Experience',
    placeholder: 'Experience Required',
};

const textareaProps = {
    labelText: 'Description',
    placeholder: 'Interview Description',
    id: 'description',
    cols: 50,
    rows: 4,
};

interface Props {}

const items = [
    {
        id: 'student',
        text: 'Student',
    },
    {
        id: 'Interviewer',
        text: 'Interviewer',
    },
];

export default function CreateInterviewForm({}: Props): ReactElement {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Processing...');
    const [ariaLive, setAriaLive] = useState<
        'off' | 'assertive' | 'polite' | undefined
    >('off');
    const history = useHistory();

    const { width, height } = useWindowDimensions();
    const [, createInterview] = useIcreateInterviewMutation();

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await createInterview(values);
            if (response.error) throw new Error('Something is wrong');
            toast.dark('Created ' + response.data?.IcreateInterview.title, {
                type: 'success',
            });
        } catch (error) {
            toast.dark('Something went wrong !', {
                type: 'error',
            });
        }
    };

    return (
        <Grid className="bx--col-md-6 bx--col-lg-7">
            <Formik
                initialValues={{
                    title: '',
                    position: '',
                    experience: '',
                    description: '',
                }}
                validate={values => {
                    // console.log(values);
                    // const errors = {};
                    // if (!values.email) {
                    //     errors.email = 'Required';
                    // } else if (
                    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    //         values.email,
                    //     )
                    // ) {
                    //     errors.email = 'Invalid email address';
                    // }
                    // return errors;
                }}
                onSubmit={onSubmit}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div style={{ marginTop: '2rem' }}>
                            <TextInput
                                type="text"
                                id="title"
                                onChange={handleChange}
                                labelText="Title"
                                placeholder="Interview Title"
                            />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <Row>
                                <Column
                                    style={{ marginTop: '1rem' }}
                                    md={4}
                                    lg={8}>
                                    <TextInput
                                        onChange={handleChange}
                                        type="text"
                                        id="position"
                                        labelText="Position"
                                        placeholder="Position"
                                    />
                                </Column>
                                <Column
                                    style={{ marginTop: '1rem' }}
                                    md={4}
                                    lg={8}>
                                    <TextInput
                                        onChange={handleChange}
                                        type="text"
                                        {...TextInputProps}
                                    />
                                </Column>
                            </Row>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <TextArea
                                onChange={handleChange}
                                {...textareaProps}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                flexWrap: 'wrap',
                                gap: '2rem',
                                justifyContent: 'space-between',
                                marginTop: '2rem',
                            }}>
                            {isSubmitting || success ? (
                                <InlineLoading
                                    style={{ marginLeft: '1rem' }}
                                    description={description}
                                    status={success ? 'finished' : 'active'}
                                    aria-live={ariaLive}
                                />
                            ) : (
                                <Button kind="tertiary" type="submit">
                                    Save
                                </Button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
}

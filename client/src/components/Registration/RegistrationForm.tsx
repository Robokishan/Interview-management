import {
    Button,
    Dropdown,
    Form,
    Grid,
    InlineLoading,
    TextArea,
    TextInput,
} from 'carbon-components-react';
import { Formik } from 'formik';

import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegistrationMutation } from '../../generated/graphql';
const TextInputProps = {
    id: 'email',
    labelText: 'Email',
    placeholder: 'Email',
};

const PasswordProps = {
    id: 'password',
    placeholder: 'Password',
    labelText: 'Password',
};

const InvalidPasswordProps = {
    id: 'password2',
    labelText: 'Password',
    invalid: true,
    placeholder: 'Password',
    invalidText:
        'Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.',
};
interface Props {}

const items = [
    {
        id: 'student',
        text: 'Student',
    },
    {
        id: 'interviewer',
        text: 'Interviewer',
    },
];

export default function RegistrationForm({}: Props): ReactElement {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Processing...');
    const [ariaLive, setAriaLive] = useState<
        'off' | 'assertive' | 'polite' | undefined
    >('off');
    const history = useHistory();

    const [, registrationMut] = useRegistrationMutation();

    const onSubmit = async (values, { setSubmitting }) => {
        const response = await registrationMut(values);
        if (response.data?.registration.errors) {
            toast.dark(response.data.registration.errors[0].message, {
                type: 'success',
            });
        } else {
            toast.dark('Welcome ' + response?.data?.registration.user?.name, {
                type: 'success',
            });
        }
    };

    const onHandleChange = e => {
        console.log(e);
    };

    return (
        <Grid className="bx--col-md-4 bx--col-lg-6">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    type: '',
                    details: '',
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
                                id="name"
                                labelText="Name"
                                placeholder="Full Name"
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <TextInput
                                type="text"
                                id="username"
                                labelText="Username"
                                placeholder="Username"
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <TextInput
                                type="email"
                                onChange={handleChange}
                                {...TextInputProps}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <TextInput.PasswordInput
                                type="password"
                                required
                                onChange={handleChange}
                                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                {...PasswordProps}
                            />
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            <Dropdown
                                id="type"
                                titleText="Who am i?"
                                helperText="This is differentiate between student and interviewer"
                                label="Please select"
                                items={items}
                                itemToString={item => (item ? item.text : '')}
                                onChange={e => {
                                    let val = {
                                        target: {
                                            name: 'type',
                                            value: e.selectedItem?.id,
                                        },
                                    };
                                    handleChange(val);
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <TextArea
                                labelText="Details"
                                placeholder="Details"
                                id="details"
                                onChange={handleChange}
                                cols={50}
                                rows={4}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '300px',
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
                                <Button kind="primary" type="submit">
                                    Registration
                                </Button>
                            )}
                            <Button
                                kind="secondary"
                                onClick={e => history.push('/auth/login')}>
                                Login
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
}

import {
    Button,
    Form,
    InlineLoading,
    TextInput,
    ToastNotification,
} from 'carbon-components-react';
import { Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../generated/graphql';
import storage from '../../utils/storage/storage';
interface Props {}

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

const notificationProps = () => ({
    lowContrast: false,
    role: 'alert',

    hideCloseButton: false,
});

const toastNotificationProps = () => ({
    ...notificationProps(),
    timeout: 1000,
});

export default function Login({}: Props): ReactElement {
    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Logging in...');
    const [ariaLive, setAriaLive] = useState<
        'off' | 'assertive' | 'polite' | undefined
    >('off');
    const history = useHistory();
    const [, loginMut] = useLoginMutation();

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     setAriaLive('assertive');

    //     // Instead of making a real request, we mock it with a timer
    //     setTimeout(() => {
    //         setIsSubmitting(false);
    //         setSuccess(true);
    //         setDescription('Logged in!');

    //         // To make submittable again, we reset the state after a bit so the user gets completion feedback
    //         setTimeout(() => {
    //             setSuccess(false);
    //             setDescription('Logging in...');
    //             setAriaLive('off');
    //         }, 1500);
    //     }, 2000);
    // };

    const handleSubmit = async (values, { setSubmitting }) => {
        const response = await loginMut(values);
        if (response.data?.login.errors) {
            toast.dark(response.data.login.errors[0].message, {
                type: 'error',
            });
        } else {
            toast.dark('Welcome! ' + response?.data?.login.user?.name, {
                type: 'success',
            });
            storage.saveUser(response.data?.login.user);
            if (response.data?.login.user?.type == 'student') {
                setTimeout(() => {
                    history.push('/admin/student/interviews');
                }, 200);
            } else {
                setTimeout(() => {
                    history.push('/admin/interviewer/candidates');
                }, 200);
            }
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
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
            onSubmit={handleSubmit}>
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
                            onChange={handleChange}
                            type="email"
                            {...TextInputProps}
                        />
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <TextInput.PasswordInput
                            onChange={handleChange}
                            type="password"
                            required
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            {...PasswordProps}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            width: '300px',
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
                                Login
                            </Button>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
}

import {
    Button,
    Form,
    InlineLoading,
    TextInput,
} from 'carbon-components-react';
import React, { ReactElement, useState } from 'react';

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

export default function Login({}: Props): ReactElement {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Logging in...');
    const [ariaLive, setAriaLive] = useState<
        'off' | 'assertive' | 'polite' | undefined
    >('off');

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setAriaLive('assertive');

        // Instead of making a real request, we mock it with a timer
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setDescription('Logged in!');

            // To make submittable again, we reset the state after a bit so the user gets completion feedback
            setTimeout(() => {
                setSuccess(false);
                setDescription('Logging in...');
                setAriaLive('off');
            }, 1500);
        }, 2000);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{ marginTop: '2rem' }}>
                <TextInput type="email" {...TextInputProps} />
            </div>
            <div style={{ marginTop: '2rem' }}>
                <TextInput
                    type="password"
                    required
                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    {...PasswordProps}
                />
            </div>
            {/* <div style={{ marginTop: '2rem' }}>
                <TextInput
                    type="password"
                    required
                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    {...InvalidPasswordProps}
                />
            </div> */}
            <div style={{ display: 'flex', width: '300px', marginTop: '2rem' }}>
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
    );
}

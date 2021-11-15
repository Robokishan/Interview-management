import { Grid, Row } from 'carbon-components-react';
import React, { ReactElement, useState } from 'react';
import ProfileForm from './CandidateProfileForm';
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

export default function CandidateProfile({}: Props): ReactElement {
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
        <>
            <Grid>
                <div className="header-body text-center mb-7">
                    <Row style={{ textAlign: 'center' }}>
                        <div className="bx--col">
                            <h1 className="text-white">Candidate Profile</h1>
                        </div>
                    </Row>
                </div>
                <ProfileForm />
            </Grid>
        </>
    );
}

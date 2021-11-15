import {
    Button,
    Dropdown,
    Form,
    Grid,
    InlineLoading,
    TextInput,
} from 'carbon-components-react';

import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
        id: 'Interviewer',
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

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setAriaLive('assertive');

        // Instead of making a real request, we mock it with a timer
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setDescription('Registration Done!');

            // To make submittable again, we reset the state after a bit so the user gets completion feedback
            setTimeout(() => {
                setSuccess(false);
                setDescription('Processing...');
                setAriaLive('off');
            }, 1500);
        }, 2000);
    };

    const onChange = e => {
        console.log(e);
    };

    return (
        <Grid className="bx--col-md-4 bx--col-lg-6">
            <Form onSubmit={handleSubmit}>
                <div style={{ marginTop: '2rem' }}>
                    <TextInput
                        type="text"
                        id="name"
                        labelText="Name"
                        placeholder="Full Name"
                    />
                </div>
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
                <div style={{ marginTop: '2rem' }}>
                    <Dropdown
                        id="default"
                        titleText="Who am i?"
                        helperText="This is differentiate between student and interviewer"
                        label="Please select"
                        items={items}
                        itemToString={item => (item ? item.text : '')}
                        onChange={onChange}
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
        </Grid>
    );
}

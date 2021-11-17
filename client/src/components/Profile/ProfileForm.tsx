import {
    Button,
    Column,
    Dropdown,
    Form,
    Grid,
    InlineLoading,
    Row,
    TextArea,
    TextInput,
    Tooltip,
} from 'carbon-components-react';

import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MeQuery, useMeQuery } from '../../generated/graphql';
import useWindowDimensions from '../../hooks/useWindowDimensions';
const TextInputProps = {
    id: 'email',
    labelText: 'Email',
    placeholder: 'Email',
};
const textareaProps = {
    labelText: 'Details',
    placeholder: 'Details',
    id: 'details',
    cols: 50,
    rows: 4,
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

export default function ProfileForm({}: Props): ReactElement {
    const [user, setUser] = useState<any>({
        name: '',
        username: '',
        type: '',
        email: '',
        details: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [description, setDescription] = useState('Processing...');
    const [ariaLive, setAriaLive] = useState<
        'off' | 'assertive' | 'polite' | undefined
    >('off');
    const history = useHistory();

    const { width, height } = useWindowDimensions();

    const [{ data, fetching, error }] = useMeQuery();
    useEffect(() => {
        let user = {
            name: data?.me.name,
            username: data?.me.username,
            type: data?.me.type,
            email: data?.me.email,
            details: data?.me.details,
        };
        setUser(user);
    }, [data]);

    return (
        <Grid className="bx--col-md-4 bx--col-lg-7">
            <Form>
                <div style={{ marginTop: '2rem' }}>
                    <Row>
                        <Column style={{ marginTop: '2rem' }} lg={8}>
                            <TextInput
                                defaultValue={user.username}
                                disabled
                                type="text"
                                id="username"
                                labelText="Username"
                                placeholder="Username"
                            />
                        </Column>
                        <Column style={{ marginTop: '2rem' }} lg={8}>
                            <TextInput
                                defaultValue={user.email}
                                disabled
                                type="email"
                                {...TextInputProps}
                            />
                        </Column>
                    </Row>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <TextInput
                        defaultValue={user.name}
                        disabled
                        type="text"
                        id="name"
                        labelText="Name"
                        placeholder="Full Name"
                    />
                </div>
                {/* <div style={{ marginTop: '2rem' }}>
                    <TextInput
                    
                        disabled
                        type="password"
                        required
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        {...PasswordProps}
                    />
                </div> */}
                <div style={{ marginTop: '2rem' }}>
                    <Dropdown
                        defaultValue={user.type}
                        id="default"
                        disabled
                        titleText="Who am i?"
                        helperText="This is differentiate between student and interviewer"
                        label="Please select"
                        items={items}
                        itemToString={item => (item ? item.text : '')}
                    />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <TextArea
                        disabled
                        defaultValue={user.details}
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
                        <Button disabled kind="tertiary" type="submit">
                            Update
                        </Button>
                    )}
                </div>
            </Form>
        </Grid>
    );
}

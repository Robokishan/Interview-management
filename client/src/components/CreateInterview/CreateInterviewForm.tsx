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
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const TextInputProps = {
    id: 'exp',
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

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true);
        setAriaLive('assertive');

        // Instead of making a real request, we mock it with a timer
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            setDescription('Done!');

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
        <Grid className="bx--col-md-6 bx--col-lg-7">
            <Form onSubmit={handleSubmit}>
                <div style={{ marginTop: '2rem' }}>
                    <TextInput
                        type="text"
                        id="title"
                        labelText="Title"
                        placeholder="Interview Title"
                    />
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <Row>
                        <Column style={{ marginTop: '1rem' }} md={4} lg={8}>
                            <TextInput
                                type="text"
                                id="position"
                                labelText="Position"
                                placeholder="Position"
                            />
                        </Column>
                        <Column style={{ marginTop: '1rem' }} md={4} lg={8}>
                            <TextInput type="text" {...TextInputProps} />
                        </Column>
                    </Row>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <TextArea {...textareaProps} />
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
        </Grid>
    );
}

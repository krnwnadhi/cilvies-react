import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
    const [value,
        // setValue
    ] = React.useState(
        Math.floor(Math.random() * 5) + 1
    );

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    precision={0.5}
                    size="small"
                />
            </Box>
        </div>
    );
}

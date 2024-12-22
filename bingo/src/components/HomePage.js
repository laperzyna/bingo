import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const gridSize = 5

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#efeded ',
    border: '2px solid #38761d',
    padding: theme.spacing(3),
    textAlign: 'center',
    alignContent: 'center',
    height: '60px',
    width: '60px',
    '&:hover': {
        backgroundColor: '#38761d',
        color: '#fff',
    },
}));

export default function HomePage() {
    const [selected, setSelected] = useState(() => {
        // Retrieve saved state from localStorage or initialize with an empty array
        const saved = localStorage.getItem('selected');
        return saved ? JSON.parse(saved) : [];
    });

    const handleClick = (index) => {
        const updatedSelection = selected.includes(index)
            ? selected.filter((item) => item !== index) // Deselect if already selected
            : [...selected, index]; // Add to selected 

        setSelected(updatedSelection);
        localStorage.setItem('selected', JSON.stringify(updatedSelection)); // Save to localStorage
    };

    useEffect(() => {
        const saved = localStorage.getItem('selected');
        if (saved) {
            setSelected(JSON.parse(saved));
        }
    }, []);

    return (
        <div style={{width: '50%'}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    {Array.from({ length: gridSize }).map((_, row) => (
                        <Grid key={row} container item spacing={1}>
                            {Array.from({ length: gridSize }).map((_, col) => {
                                const index = row * gridSize + col;
                                const isSelected = selected.includes(index);

                                return (
                                    <Grid key={col} item xs>
                                        <Item
                                            onClick={() => handleClick(index)}
                                            style={{
                                                backgroundColor: isSelected ? '#38761d' : '#efeded',
                                                color: isSelected ? '#fff' : '#000',
                                            }}
                                        >
                                            {index + 1}
                                        </Item>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

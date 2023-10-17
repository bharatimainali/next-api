'use client';
import { useState } from 'react';

interface Fruit {
    id: number;
    name: string;
}
export default function Home() {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [newFruit, setNewFruit] = useState('');

    // Fetch all fruits
    const getFruits = async () => {
        try {
            const res = await fetch('./api/fruit');
            if (!res.ok) {
                throw new Error('Failed to fetch fruits');
            }
            const data = await res.json();
            setFruits(data.fruits);
        } catch (error) {
            console.error('An error occurred:', error);
            // Optionally, set an error state here to display in the UI
        }
    };

    // add a new fruit

    const addFruit = async () => {
        try {
            const res = await fetch('./api/fruit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newFruit }),
            });
            if (!res.ok) {
                throw new Error('Failed to add fruit');
            }
            const addedFruit = await res.json();
            setFruits(addedFruit);
            setNewFruit(''); // Clear the input field
        } catch (error) {
            console.error('An error occurred:', error);

            // Optionally, set an error state here to display in the UI
        }
    };

    return (
        <div>
            <h1>Fruits List</h1>

            <button onClick={() => getFruits()}>Get Fruits</button>

            <ul>
                {fruits.map((fruit) => (
                    <li key={fruit.id}>{fruit.name}</li>
                ))}
            </ul>

            <div>
                <input
                    type="text"
                    placeholder="New Fruit"
                    value={newFruit}
                    onChange={(e) => setNewFruit(e.target.value)}
                />
                <button onClick={addFruit}>Add Fruit</button>
            </div>
        </div>
    );
}

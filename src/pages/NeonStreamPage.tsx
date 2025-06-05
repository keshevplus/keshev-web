import * as React from 'react';
import NeonEventStream from '../components/NeonEventStream';

const NeonStreamPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Neon Event Stream</h1>
            <NeonEventStream />
        </div>
    );
};

export default NeonStreamPage;
// filepath: c:\KESHEVPLUS\20250601\keshev-web\src\components\EditableSection.tsx
import React, { JSX } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import ContentEditable from './ContentEditable';
import { useContentUpdate } from '../hooks/useContentUpdate';

interface EditableSectionProps {
    content: string;
    contentId?: string;
    contentType?: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    sectionKey?: string;
    onUpdate?: (value: string) => void;
}

const EditableSection: React.FC<EditableSectionProps> = ({
    content,
    contentId,
    contentType = 'default',
    className = '',
    as = 'div',
    sectionKey,
    onUpdate
}) => {
    const { isEditMode } = useAdmin();
    const { updateContent, isUpdating: isLoading } = useContentUpdate(contentType);

    const handleContentChange = async (newContent: string) => {
        if (newContent !== content) {
            // If contentId is provided, use the built-in updateContent
            if (contentId) {
                await updateContent(
                    JSON.stringify({
                        id: contentId,
                        type: contentType,
                        content: newContent,
                        sectionKey
                    }),
                    contentType
                );
            }

            // Always call the onUpdate prop if provided (both with and without contentId)
            if (onUpdate) {
                onUpdate(newContent);
            }
        }
    };

    if (isEditMode) {
        return (
            <ContentEditable
                content={content}
                onUpdate={handleContentChange}
                className={`editable-content ${className} ${isLoading ? 'saving' : ''}`}
            />
        );
    }

    // More typesafe approach to dynamic element rendering
    const ElementType = React.createElement;
    return ElementType(
        as,
        {
            className,
            dangerouslySetInnerHTML: { __html: content }
        }
    );
};

export default EditableSection;
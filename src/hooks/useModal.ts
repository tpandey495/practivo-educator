import { useState } from "react";

export const useModal = () => {
    const [isOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return { isOpen, openModal, closeModal };
};

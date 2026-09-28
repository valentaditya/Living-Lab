import React from 'react';
import { ButtonBase } from '../atoms/ButtonBase';

interface ButtonCTAProps {
  text: string;
}

export const ButtonCTA: React.FC<ButtonCTAProps> = ({ text }) => {
  return <ButtonBase>{text}</ButtonBase>;
};
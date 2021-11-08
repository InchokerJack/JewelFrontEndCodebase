import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';

interface Iprops {
  handleOpenInput: any;
}
export function MainMenu({ handleOpenInput }: Iprops) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        background="white"
      />
      <MenuList>
        <MenuItem onClick={handleOpenInput} icon={<AddIcon />}>
          Add commit balance
        </MenuItem>
        <MenuItem icon={<ExternalLinkIcon />}>Withdraw Commit Balance</MenuItem>
      </MenuList>
    </Menu>
  );
}

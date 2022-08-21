import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='#'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='#'>
            About
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Contact</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Button
        className="content-field"
        variant="text"
        size="large"
        type="submit"
      >
        <LogoutIcon
          sx={{ fontSize: 25, color: 'gray' }}
          onClick={ () => { navigate('/login'), localStorage.clear(); } }
        />
      </Button>
    </div>
  )
}

export default Header;

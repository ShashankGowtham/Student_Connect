import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  SupervisorAccount as SupervisorAccountIcon
} from '@mui/icons-material';
import styled from '@emotion/styled';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '32px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '#FFFFFF',
  border: '1px solid #000000',
  transition: 'transform 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const IconWrapper = styled(Box)({
  marginBottom: '24px',
  '& svg': {
    fontSize: '64px',
    color: '#000000',
  },
});

const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
});

const RoleCard = ({ icon: Icon, title, description, buttonText, onClick }) => (
  <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
    <StyledPaper onClick={onClick}>
      <ContentWrapper>
        <Box>
          <IconWrapper>
            <Icon />
          </IconWrapper>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#333333' }}>
            {description}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderColor: '#000000',
            color: '#000000',
            '&:hover': {
              borderColor: '#333333',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          {buttonText}
        </Button>
      </ContentWrapper>
    </StyledPaper>
  </Grid>
);

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleCardClick = (role) => {
    if (visitor === "guest") {
      if (role === "Admin") {
        navigate('/Adminlogin');
      }
      else if (role === "Student") {
        navigate('/Studentlogin');
      }
      else if (role === "Teacher") {
        navigate('/Teacherlogin');
      }
    }
    else {
      if (role === "Admin") {
        navigate('/Adminregister');
      }
      else if (role === "Student") {
        navigate('/Studentlogin');
      }
      else if (role === "Teacher") {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  const roles = [
    {
      icon: SchoolIcon,
      title: 'Student',
      description: 'Access your courses, assignments, and grades',
      buttonText: visitor === "guest" ? 'Login as Student' : 'Register as Student',
      onClick: () => handleCardClick('Student')
    },
    {
      icon: PersonIcon,
      title: 'Teacher',
      description: 'Manage your classes and student progress',
      buttonText: visitor === "guest" ? 'Login as Teacher' : 'Register as Teacher',
      onClick: () => handleCardClick('Teacher')
    },
    {
      icon: SupervisorAccountIcon,
      title: 'Admin',
      description: 'Oversee and manage the entire system',
      buttonText: visitor === "guest" ? "Login as Admin" : "Register as Admin",
      onClick: () => handleCardClick('Admin')
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 8,
            fontWeight: 600,
            color: '#000000',
          }}
        >
          Choose Your Role
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {roles.map((role, index) => (
            <RoleCard key={index} {...role} />
          ))}
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default ChooseUser;
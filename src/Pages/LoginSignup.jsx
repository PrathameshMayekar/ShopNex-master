import React, { useState } from 'react';
import * as Components from './Components';

const LoginSignup = () => {
  const [signIn, toggle] = useState(true);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false); // Toggle for signup password
  const [showPasswordSignin, setShowPasswordSignin] = useState(false); // Toggle for signin password

  return (
    <Components.div>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='text' placeholder='Name' />
            <Components.Input type='email' placeholder='Email' />
            
            {/* Password input with visibility toggle */}
            <div style={{ position: 'relative' }}>
              <Components.Input 
                type={showPasswordSignup ? 'text' : 'password'} 
                placeholder='Password' 
              />
              <span 
                onClick={() => setShowPasswordSignup(!showPasswordSignup)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#007bff',
                }}
              >
                {showPasswordSignup ? 'Hide' : 'Show'}
              </span>
            </div>

            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type='email' placeholder='Email' />
            
            {/* Password input with visibility toggle */}
            <div style={{ position: 'relative' }}>
              <Components.Input 
                type={showPasswordSignin ? 'text' : 'password'} 
                placeholder='Password' 
              />
              <span 
                onClick={() => setShowPasswordSignin(!showPasswordSignin)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#007bff',
                }}
              >
                {showPasswordSignin ? 'Hide' : 'Show'}
              </span>
            </div>

            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>

      </Components.Container>
    </Components.div>
  );
}

export default LoginSignup;

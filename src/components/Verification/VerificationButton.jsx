import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import { updateExistingResource, setSelectedPlace } from 'actions/actions';
import { updateResource } from '../../db';

const PASSWORD = 'ZnJlZXdhdGVy'; // Ask in Slack if you want the real password

/**
 * This button provides all functionality for locally verifying a resource.
 * @param {object} props
 * @param {ResourceEntry} props.resource The resource being verified
 * @returns
 */
const VerificationButton = ({ resource }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [name, setName] = useState('');
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setPassword('');
    setIsAdmin(false);
    setHasBeenUpdated(false);
    setLoginError('');
  }, []);

  const updateResourceEntry = useCallback(
    selectedResource => {
      updateResource(selectedResource);
      setHasBeenUpdated(true);
      dispatch(updateExistingResource({ resource: selectedResource }));
      dispatch(setSelectedPlace(selectedResource));
    },
    [dispatch]
  );

  const markAsVerified = useCallback(() => {
    const newVerification = {
      verified: true,
      last_modifier: name || 'phlask_app',
      last_modified: new Date().toISOString()
    };
    const newResource = {
      ...resource,
      verification: newVerification
    };
    updateResourceEntry(newResource);
  }, [name, resource, updateResourceEntry]);

  const markAsUnverified = useCallback(() => {
    const newVerification = {
      verified: false,
      last_modifier: name || 'phlask_app',
      last_modified: new Date().toISOString()
    };
    const newResource = {
      ...resource,
      verification: newVerification
    };
    updateResourceEntry(newResource);
  }, [name, resource, updateResourceEntry]);

  const markAsInactive = useCallback(() => {
    const newVerification = {
      verified: false,
      last_modifier: name || 'phlask_app',
      last_modified: new Date().toISOString()
    };
    const newResource = {
      ...resource,
      status: 'HIDDEN',
      verification: newVerification
    };
    updateResourceEntry(newResource);
  }, [name, resource, updateResourceEntry]);

  if (!resource) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          backgroundColor: resource.verification.verified ? 'Green' : 'Tomato',
          padding: '5px',
          borderRadius: '5px',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        {resource.verification.verified ? 'VERIFIED' : 'UNVERIFIED'}
      </button>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <div
          style={{
            width: '300px',
            padding: '16px'
          }}
        >
          {!isAdmin && (
            <div>
              <p>
                Enter the admin password to update the verified status of this
                resource. Also enter your name.
              </p>
              <Input
                placeholder="Your name"
                sx={{ width: '100%', marginBottom: '10px' }}
                type="text"
                autoComplete="disabled"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
              />
              <Input
                placeholder="The admin password"
                sx={{ width: '100%', marginBottom: '10px' }}
                type="password"
                autoComplete="disabled"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
              />
              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px'
                }}
              >
                <Button
                  onClick={closeModal}
                  sx={{
                    flex: 1,
                    backgroundColor: 'gray',
                    '&:hover': {
                      backgroundColor: 'gray'
                    },
                    color: 'white',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (btoa(password) === PASSWORD) {
                      setIsAdmin(true);
                    } else {
                      setLoginError('Invalid password');
                    }
                  }}
                  sx={{
                    flex: 1,
                    backgroundColor: 'blue',
                    '&:hover': {
                      backgroundColor: 'blue'
                    },
                    color: 'white',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          )}
          {isAdmin && (
            <div>
              {!hasBeenUpdated && (
                <div>
                  {/* As an admin, you can either mark this as verified, unverified, or inactive */}
                  <p>
                    Please select the change you would like to make. This was
                    previously marked as{' '}
                    {resource.verification.verified ? 'VERIFIED' : 'UNVERIFIED'}{' '}
                    by {resource.verification.last_modifier}.
                  </p>

                  <Button
                    onClick={markAsVerified}
                    sx={{
                      backgroundColor: 'green',
                      '&:hover': {
                        backgroundColor: 'green'
                      },
                      color: 'white',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    MARK AS VERIFIED
                  </Button>
                  <Button
                    onClick={markAsUnverified}
                    sx={{
                      backgroundColor: 'orange',
                      '&:hover': {
                        backgroundColor: 'orange'
                      },
                      color: 'white',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    Mark as Unverified
                  </Button>
                  <Button
                    onClick={markAsInactive}
                    sx={{
                      backgroundColor: 'red',
                      '&:hover': {
                        backgroundColor: 'red'
                      },
                      color: 'white',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    Mark as Inactive
                  </Button>
                  <Button
                    onClick={closeModal}
                    sx={{
                      backgroundColor: 'grey',
                      '&:hover': {
                        backgroundColor: 'grey'
                      },
                      color: 'white',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {hasBeenUpdated && (
                <div>
                  <p>Your change has been recorded. Thanks!</p>
                  <Button
                    onClick={closeModal}
                    sx={{
                      backgroundColor: 'grey',
                      '&:hover': {
                        backgroundColor: 'grey'
                      },
                      color: 'white',
                      padding: '10px',
                      margin: '5px',
                      borderRadius: '5px',
                      width: '100%'
                    }}
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default VerificationButton;

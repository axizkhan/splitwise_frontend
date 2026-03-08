import React from "react";
import { Box } from "@chakra-ui/react";
import { MdLogout, MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppBranding from "../common/AppBranding";
import { useAuth } from "../../core/state/auth";

const AppHeader: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose();
  };

  const drawerWidth =
    typeof window !== "undefined" && window.innerWidth < 768 ? "50vw" : "360px";

  return (
    <>
      {/* HEADER */}
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex={100}
        borderBottom="1px solid rgba(255,255,255,0.08)"
        bg="rgba(26,32,44,0.85)"
        backdropFilter="blur(10px)"
        w="100%"
        py={{ mdDown: 1, md: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.5rem 1.5rem",
            maxWidth: 1200,
            margin: "0 auto",
          }}>
          <AppBranding />

          <button
            aria-label="Open menu"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              cursor: "pointer",
              padding: 6,
              display: "flex",
              alignItems: "center",
            }}
            onClick={onOpen}>
            <MdMenu
              size={24}
              color="#fff"
            />
          </button>
        </div>
      </Box>

      {/* OVERLAY */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: isOpen ? "rgba(0,0,0,0.35)" : "transparent",
          backdropFilter: isOpen ? "blur(6px)" : "none",
          transition: "all 0.3s ease",
          pointerEvents: isOpen ? "auto" : "none",
          zIndex: 1500,
        }}
      />

      {/* DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: drawerWidth,
          height: "100vh",
          background: "#1f2937",
          zIndex: 2000,
          boxShadow: "-10px 0 40px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        }}>
        {/* HEADER SECTION */}
        <div
          style={{
            padding: "1.2rem",
            borderBottom: "1px solid #374151",
            position: "relative",
          }}>
          <button
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              position: "absolute",
              top: 12,
              right: 16,
              color: "#fff",
              fontSize: 26,
              cursor: "pointer",
            }}
            onClick={onClose}>
            ×
          </button>

          {isAuthenticated && user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4FD1C5,#38B2AC)",
                  color: "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 20,
                }}>
                {user.firstName?.[0]}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 600, color: "#fff" }}>
                  {user.firstName} {user.lastName}
                </span>

                <span
                  style={{
                    fontSize: 13,
                    color: "#9ca3af",
                  }}>
                  {user.email}
                </span>
              </div>
            </div>
          ) : (
            <span style={{ fontWeight: 700, color: "#fff" }}>Menu</span>
          )}
        </div>

        {/* MENU */}
        <div
          style={{
            flex: 1,
            padding: "1.8rem 1.4rem",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
          {isAuthenticated ? (
            <></>
          ) : (
            <>
              <button
                style={{
                  background: "linear-gradient(135deg,#4FD1C5,#38B2AC)",
                  color: "#111",
                  border: "none",
                  borderRadius: 7,
                  padding: "0.8rem 0",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/signup");
                  onClose();
                }}>
                Signup
              </button>

              <button
                style={{
                  background: "transparent",
                  color: "#4FD1C5",
                  border: "2px solid #4FD1C5",
                  borderRadius: 7,
                  padding: "0.8rem 0",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}>
                Login
              </button>
            </>
          )}
        </div>

        {/* LOGOUT */}
        {isAuthenticated && (
          <div
            style={{
              borderTop: "1px solid #374151",
              padding: "1rem 1.4rem",
            }}>
            <button
              style={{
                width: "100%",
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.35)",
                color: "#f87171",
                borderRadius: 7,
                padding: "0.7rem 0",
                fontWeight: 600,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
              onClick={handleLogout}>
              <MdLogout size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AppHeader;

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#8B5CF6',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#C4B5FD',
					foreground: '#581C87'
				},
				tertiary: {
					DEFAULT: '#A855F7',
					foreground: '#FFFFFF'
				},
				surface: {
					DEFAULT: '#FAF8FF',
					variant: '#E7E0EC',
					container: '#F3EDF7',
					'container-high': '#ECE6F0',
					'container-highest': '#E6E0E9'
				},
				outline: {
					DEFAULT: '#DDD6FE',
					variant: '#CAC4D0'
				},
				error: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
					container: '#FECACA'
				},
				warning: {
					DEFAULT: '#F59E0B',
					foreground: '#FFFFFF',
					container: '#FEF3C7'
				},
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF',
					container: '#D1FAE5'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F3E8FF',
					foreground: '#581C87'
				},
				accent: {
					DEFAULT: '#C4B5FD',
					foreground: '#581C87'
				},
				popover: {
					DEFAULT: '#FAF8FF',
					foreground: '#1C1B1F'
				},
				card: {
					DEFAULT: '#FAF8FF',
					foreground: '#1C1B1F'
				},
				sidebar: {
					DEFAULT: '#FAF8FF',
					foreground: '#1C1B1F',
					primary: '#8B5CF6',
					'primary-foreground': '#FFFFFF',
					accent: '#DDD6FE',
					'accent-foreground': '#1C1B1F',
					border: '#DDD6FE',
					ring: '#8B5CF6'
				}
			},
			borderRadius: {
				lg: '20px',
				md: '16px',
				sm: '12px'
			},
			boxShadow: {
				'elevation-1': '0px 1px 2px 0px rgba(139, 92, 246, 0.15), 0px 1px 3px 1px rgba(139, 92, 246, 0.1)',
				'elevation-2': '0px 1px 2px 0px rgba(139, 92, 246, 0.15), 0px 2px 6px 2px rgba(139, 92, 246, 0.1)',
				'elevation-3': '0px 1px 3px 0px rgba(139, 92, 246, 0.15), 0px 4px 8px 3px rgba(139, 92, 246, 0.1)',
				'elevation-4': '0px 2px 3px 0px rgba(139, 92, 246, 0.15), 0px 6px 10px 4px rgba(139, 92, 246, 0.1)',
				'elevation-5': '0px 4px 4px 0px rgba(139, 92, 246, 0.15), 0px 8px 12px 6px rgba(139, 92, 246, 0.1)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

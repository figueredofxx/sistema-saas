
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
				sans: ['Google Sans', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#6750A4',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#625B71',
					foreground: '#FFFFFF'
				},
				tertiary: {
					DEFAULT: '#7D5260',
					foreground: '#FFFFFF'
				},
				surface: {
					DEFAULT: '#FEF7FF',
					variant: '#E7E0EC',
					container: '#F3EDF7',
					'container-high': '#ECE6F0',
					'container-highest': '#E6E0E9'
				},
				outline: {
					DEFAULT: '#79747E',
					variant: '#CAC4D0'
				},
				error: {
					DEFAULT: '#BA1A1A',
					foreground: '#FFFFFF',
					container: '#FFDAD6'
				},
				warning: {
					DEFAULT: '#8B5000',
					foreground: '#FFFFFF',
					container: '#FFDDB3'
				},
				success: {
					DEFAULT: '#006E1C',
					foreground: '#FFFFFF',
					container: '#A7F432'
				},
				destructive: {
					DEFAULT: '#BA1A1A',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#F3EDF7',
					foreground: '#49454F'
				},
				accent: {
					DEFAULT: '#625B71',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: '#FEF7FF',
					foreground: '#1C1B1F'
				},
				card: {
					DEFAULT: '#FEF7FF',
					foreground: '#1C1B1F'
				},
				sidebar: {
					DEFAULT: '#FEF7FF',
					foreground: '#1C1B1F',
					primary: '#6750A4',
					'primary-foreground': '#FFFFFF',
					accent: '#E7E0EC',
					'accent-foreground': '#1C1B1F',
					border: '#E7E0EC',
					ring: '#6750A4'
				}
			},
			borderRadius: {
				lg: '16px',
				md: '12px',
				sm: '8px'
			},
			boxShadow: {
				'elevation-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
				'elevation-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
				'elevation-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
				'elevation-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
				'elevation-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)'
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

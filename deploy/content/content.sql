--
-- PostgreSQL database dump
--



SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.media DISABLE TRIGGER ALL;

COPY public.media (id, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_thumb_url, sizes_thumb_width, sizes_thumb_height, sizes_thumb_mime_type, sizes_thumb_filesize, sizes_thumb_filename, sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, sizes_wide_url, sizes_wide_width, sizes_wide_height, sizes_wide_mime_type, sizes_wide_filesize, sizes_wide_filename, sizes_hero_url, sizes_hero_width, sizes_hero_height, sizes_hero_mime_type, sizes_hero_filesize, sizes_hero_filename, sizes_logo_url, sizes_logo_width, sizes_logo_height, sizes_logo_mime_type, sizes_logo_filesize, sizes_logo_filename) FROM stdin;
1	2026-10-16 05:54:14.798+00	2026-10-15 13:31:17.844+00	/api/media/file/port-1.jpg	http://localhost:3000/api/media/file/port-480x360.jpg	port-1.jpg	image/jpeg	280002	2400	1807	50	50	/api/media/file/port-1-480x360.jpg	480	360	image/jpeg	26012	port-1-480x360.jpg	/api/media/file/port-1-960x720.jpg	960	720	image/jpeg	82468	port-1-960x720.jpg	/api/media/file/port-1-1600x1205.jpg	1600	1205	image/jpeg	181524	port-1-1600x1205.jpg	/api/media/file/port-1-2400x1807.jpg	2400	1807	image/jpeg	292744	port-1-2400x1807.jpg	\N	\N	\N	\N	\N	\N
2	2026-10-16 05:54:15.747+00	2026-10-15 13:31:19.106+00	/api/media/file/port2-1.jpg	http://localhost:3000/api/media/file/port2-480x360.jpg	port2-1.jpg	image/jpeg	930291	2400	1600	50	50	/api/media/file/port2-1-480x360.jpg	480	360	image/jpeg	55339	port2-1-480x360.jpg	/api/media/file/port2-1-960x720.jpg	960	720	image/jpeg	211537	port2-1-960x720.jpg	/api/media/file/port2-1-1600x1067.jpg	1600	1067	image/jpeg	498407	port2-1-1600x1067.jpg	/api/media/file/port2-1-2400x1600.jpg	2400	1600	image/jpeg	964162	port2-1-2400x1600.jpg	\N	\N	\N	\N	\N	\N
3	2026-10-16 05:54:16.586+00	2026-10-15 13:31:20.177+00	/api/media/file/ship-1.jpg	http://localhost:3000/api/media/file/ship-480x360.jpg	ship-1.jpg	image/jpeg	495695	2400	1800	50	50	/api/media/file/ship-1-480x360.jpg	480	360	image/jpeg	29099	ship-1-480x360.jpg	/api/media/file/ship-1-960x720.jpg	960	720	image/jpeg	111197	ship-1-960x720.jpg	/api/media/file/ship-1-1600x1200.jpg	1600	1200	image/jpeg	281796	ship-1-1600x1200.jpg	/api/media/file/ship-1-2400x1800.jpg	2400	1800	image/jpeg	526543	ship-1-2400x1800.jpg	\N	\N	\N	\N	\N	\N
4	2026-10-16 05:54:17.289+00	2026-10-15 13:31:21.246+00	/api/media/file/warehouse-1.jpg	http://localhost:3000/api/media/file/warehouse-480x360.jpg	warehouse-1.jpg	image/jpeg	484441	2400	1600	50	50	/api/media/file/warehouse-1-480x360.jpg	480	360	image/jpeg	37975	warehouse-1-480x360.jpg	/api/media/file/warehouse-1-960x720.jpg	960	720	image/jpeg	129434	warehouse-1-960x720.jpg	/api/media/file/warehouse-1-1600x1067.jpg	1600	1067	image/jpeg	285172	warehouse-1-1600x1067.jpg	/api/media/file/warehouse-1-2400x1600.jpg	2400	1600	image/jpeg	507470	warehouse-1-2400x1600.jpg	\N	\N	\N	\N	\N	\N
5	2026-10-16 05:54:17.826+00	2026-10-15 13:31:22.346+00	/api/media/file/warehouse2-1.jpg	http://localhost:3000/api/media/file/warehouse2-480x360.jpg	warehouse2-1.jpg	image/jpeg	554981	2400	1594	50	50	/api/media/file/warehouse2-1-480x360.jpg	480	360	image/jpeg	46775	warehouse2-1-480x360.jpg	/api/media/file/warehouse2-1-960x720.jpg	960	720	image/jpeg	161764	warehouse2-1-960x720.jpg	/api/media/file/warehouse2-1-1600x1063.jpg	1600	1063	image/jpeg	334335	warehouse2-1-1600x1063.jpg	/api/media/file/warehouse2-1-2400x1594.jpg	2400	1594	image/jpeg	570483	warehouse2-1-2400x1594.jpg	\N	\N	\N	\N	\N	\N
6	2026-10-16 05:54:18.636+00	2026-10-15 13:31:23.737+00	/api/media/file/drumsBlue-1.jpg	http://localhost:3000/api/media/file/drumsBlue-480x360.jpg	drumsBlue-1.jpg	image/jpeg	567094	2400	1602	50	50	/api/media/file/drumsBlue-1-480x360.jpg	480	360	image/jpeg	35298	drumsBlue-1-480x360.jpg	/api/media/file/drumsBlue-1-960x720.jpg	960	720	image/jpeg	130894	drumsBlue-1-960x720.jpg	/api/media/file/drumsBlue-1-1600x1068.jpg	1600	1068	image/jpeg	303617	drumsBlue-1-1600x1068.jpg	/api/media/file/drumsBlue-1-2400x1602.jpg	2400	1602	image/jpeg	584771	drumsBlue-1-2400x1602.jpg	\N	\N	\N	\N	\N	\N
7	2026-10-16 05:54:19.455+00	2026-10-15 13:31:25.18+00	/api/media/file/drumsGreen-1.jpg	http://localhost:3000/api/media/file/drumsGreen-480x360.jpg	drumsGreen-1.jpg	image/jpeg	447867	2400	1800	50	50	/api/media/file/drumsGreen-1-480x360.jpg	480	360	image/jpeg	28290	drumsGreen-1-480x360.jpg	/api/media/file/drumsGreen-1-960x720.jpg	960	720	image/jpeg	105055	drumsGreen-1-960x720.jpg	/api/media/file/drumsGreen-1-1600x1200.jpg	1600	1200	image/jpeg	264452	drumsGreen-1-1600x1200.jpg	/api/media/file/drumsGreen-1-2400x1800.jpg	2400	1800	image/jpeg	477022	drumsGreen-1-2400x1800.jpg	\N	\N	\N	\N	\N	\N
8	2026-10-16 05:54:19.957+00	2026-10-15 13:31:26.634+00	/api/media/file/drumsCopper-1.jpg	http://localhost:3000/api/media/file/drumsCopper-480x360.jpg	drumsCopper-1.jpg	image/jpeg	491368	2400	1800	50	50	/api/media/file/drumsCopper-1-480x360.jpg	480	360	image/jpeg	33485	drumsCopper-1-480x360.jpg	/api/media/file/drumsCopper-1-960x720.jpg	960	720	image/jpeg	111112	drumsCopper-1-960x720.jpg	/api/media/file/drumsCopper-1-1600x1200.jpg	1600	1200	image/jpeg	272977	drumsCopper-1-1600x1200.jpg	/api/media/file/drumsCopper-1-2400x1800.jpg	2400	1800	image/jpeg	510631	drumsCopper-1-2400x1800.jpg	\N	\N	\N	\N	\N	\N
10	2026-10-16 05:54:20.583+00	2026-10-15 13:31:28.639+00	/api/media/file/crystalsBlue-1.jpg	http://localhost:3000/api/media/file/crystalsBlue-480x360.jpg	crystalsBlue-1.jpg	image/jpeg	191895	2400	1596	50	50	/api/media/file/crystalsBlue-1-480x360.jpg	480	360	image/jpeg	19679	crystalsBlue-1-480x360.jpg	/api/media/file/crystalsBlue-1-960x720.jpg	960	720	image/jpeg	58946	crystalsBlue-1-960x720.jpg	/api/media/file/crystalsBlue-1-1600x1064.jpg	1600	1064	image/jpeg	116562	crystalsBlue-1-1600x1064.jpg	/api/media/file/crystalsBlue-1-2400x1596.jpg	2400	1596	image/jpeg	198109	crystalsBlue-1-2400x1596.jpg	\N	\N	\N	\N	\N	\N
11	2026-10-16 05:54:20.871+00	2026-10-15 13:31:29.623+00	/api/media/file/crystalsCopper-1.jpg	http://localhost:3000/api/media/file/crystalsCopper-480x360.jpg	crystalsCopper-1.jpg	image/jpeg	299382	2048	1536	50	50	/api/media/file/crystalsCopper-1-480x360.jpg	480	360	image/jpeg	25722	crystalsCopper-1-480x360.jpg	/api/media/file/crystalsCopper-1-960x720.jpg	960	720	image/jpeg	85506	crystalsCopper-1-960x720.jpg	/api/media/file/crystalsCopper-1-1600x1200.jpg	1600	1200	image/jpeg	214372	crystalsCopper-1-1600x1200.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
12	2026-10-16 05:54:21.336+00	2026-10-15 13:31:30.682+00	/api/media/file/ibc-1.jpg	http://localhost:3000/api/media/file/ibc-480x360.jpg	ibc-1.jpg	image/jpeg	529189	2400	1800	50	50	/api/media/file/ibc-1-480x360.jpg	480	360	image/jpeg	40477	ibc-1-480x360.jpg	/api/media/file/ibc-1-960x720.jpg	960	720	image/jpeg	130198	ibc-1-960x720.jpg	/api/media/file/ibc-1-1600x1200.jpg	1600	1200	image/jpeg	304864	ibc-1-1600x1200.jpg	/api/media/file/ibc-1-2400x1800.jpg	2400	1800	image/jpeg	548456	ibc-1-2400x1800.jpg	\N	\N	\N	\N	\N	\N
14	2026-10-16 05:54:21.932+00	2026-10-15 13:31:32.75+00	/api/media/file/powderGreen-1.jpg	http://localhost:3000/api/media/file/powderGreen-480x360.jpg	powderGreen-1.jpg	image/jpeg	278582	1600	1200	50	50	/api/media/file/powderGreen-1-480x360.jpg	480	360	image/jpeg	39468	powderGreen-1-480x360.jpg	/api/media/file/powderGreen-1-960x720.jpg	960	720	image/jpeg	135197	powderGreen-1-960x720.jpg	/api/media/file/powderGreen-1-1600x1200.jpg	1600	1200	image/jpeg	282177	powderGreen-1-1600x1200.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
9	2026-10-16 08:15:55.861+00	2026-10-15 13:31:27.635+00	/api/media/file/nikel-tuzu-kristalleri.jpg	/api/media/file/crystalsGreen-480x360.jpg	nikel-tuzu-kristalleri.jpg	image/jpeg	539321	1536	2048	50	50	/api/media/file/nikel-tuzu-kristalleri-480x360.jpg	480	360	image/jpeg	21052	nikel-tuzu-kristalleri-480x360.jpg	/api/media/file/nikel-tuzu-kristalleri-960x720.jpg	960	720	image/jpeg	70609	nikel-tuzu-kristalleri-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/nikel-tuzu-kristalleri-600x800.jpg	600	800	image/jpeg	44824	nikel-tuzu-kristalleri-600x800.jpg
13	2026-10-16 05:54:21.67+00	2026-10-15 13:31:31.747+00	/api/media/file/powderWhite-1.jpg	http://localhost:3000/api/media/file/powderWhite-480x360.jpg	powderWhite-1.jpg	image/jpeg	318206	2221	1764	50	50	/api/media/file/powderWhite-1-480x360.jpg	480	360	image/jpeg	28867	powderWhite-1-480x360.jpg	/api/media/file/powderWhite-1-960x720.jpg	960	720	image/jpeg	94058	powderWhite-1-960x720.jpg	/api/media/file/powderWhite-1-1600x1271.jpg	1600	1271	image/jpeg	223358	powderWhite-1-1600x1271.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
15	2026-10-16 06:04:30.401+00	2026-10-16 06:04:30.366+00	/api/media/file/logo-dark.png	\N	logo-dark.png	image/png	47401	320	122	50	50	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
16	2026-10-16 06:04:30.451+00	2026-10-16 06:04:30.432+00	/api/media/file/logo-light.png	\N	logo-light.png	image/png	38030	320	122	50	50	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
18	2026-10-16 07:24:51.912+00	2026-10-16 07:24:51.91+00	/api/media/file/logo-nordic-metals.png	\N	logo-nordic-metals.png	image/png	7313	640	160	50	50	/api/media/file/logo-nordic-metals-480x360.png	480	360	image/png	22555	logo-nordic-metals-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-nordic-metals-600x150.png	600	150	image/png	14796	logo-nordic-metals-600x150.png
19	2026-10-16 07:24:52.073+00	2026-10-16 07:24:52.073+00	/api/media/file/logo-rhein-chemie-handel.png	\N	logo-rhein-chemie-handel.png	image/png	5851	640	160	50	50	/api/media/file/logo-rhein-chemie-handel-480x360.png	480	360	image/png	21322	logo-rhein-chemie-handel-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-rhein-chemie-handel-600x150.png	600	150	image/png	13635	logo-rhein-chemie-handel-600x150.png
20	2026-10-16 07:24:52.182+00	2026-10-16 07:24:52.182+00	/api/media/file/logo-shanghai-plating-materials.png	\N	logo-shanghai-plating-materials.png	image/png	9126	640	160	50	50	/api/media/file/logo-shanghai-plating-materials-480x360.png	480	360	image/png	31326	logo-shanghai-plating-materials-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-shanghai-plating-materials-600x150.png	600	150	image/png	20477	logo-shanghai-plating-materials-600x150.png
21	2026-10-16 07:24:52.301+00	2026-10-16 07:24:52.301+00	/api/media/file/logo-mumbai-salts-ltd.png	\N	logo-mumbai-salts-ltd.png	image/png	6534	640	160	50	50	/api/media/file/logo-mumbai-salts-ltd-480x360.png	480	360	image/png	22613	logo-mumbai-salts-ltd-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-mumbai-salts-ltd-600x150.png	600	150	image/png	15302	logo-mumbai-salts-ltd-600x150.png
22	2026-10-16 07:24:52.431+00	2026-10-16 07:24:52.431+00	/api/media/file/logo-liguria-chimica.png	\N	logo-liguria-chimica.png	image/png	6513	640	160	50	50	/api/media/file/logo-liguria-chimica-480x360.png	480	360	image/png	23274	logo-liguria-chimica-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-liguria-chimica-600x150.png	600	150	image/png	13310	logo-liguria-chimica-600x150.png
23	2026-10-16 07:24:52.541+00	2026-10-16 07:24:52.541+00	/api/media/file/logo-busan-zinc-co.png	\N	logo-busan-zinc-co.png	image/png	5524	640	160	50	50	/api/media/file/logo-busan-zinc-co-480x360.png	480	360	image/png	14110	logo-busan-zinc-co-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-busan-zinc-co-600x150.png	600	150	image/png	9966	logo-busan-zinc-co-600x150.png
24	2026-10-16 07:24:52.678+00	2026-10-16 07:24:52.678+00	/api/media/file/logo-anadolu-kaplama.png	\N	logo-anadolu-kaplama.png	image/png	7812	640	160	50	50	/api/media/file/logo-anadolu-kaplama-480x360.png	480	360	image/png	27797	logo-anadolu-kaplama-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-anadolu-kaplama-600x150.png	600	150	image/png	16331	logo-anadolu-kaplama-600x150.png
25	2026-10-16 07:24:52.788+00	2026-10-16 07:24:52.788+00	/api/media/file/logo-marmara-galvaniz.png	\N	logo-marmara-galvaniz.png	image/png	7740	640	160	50	50	/api/media/file/logo-marmara-galvaniz-480x360.png	480	360	image/png	31314	logo-marmara-galvaniz-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-marmara-galvaniz-600x150.png	600	150	image/png	15796	logo-marmara-galvaniz-600x150.png
26	2026-10-16 07:24:52.903+00	2026-10-16 07:24:52.903+00	/api/media/file/logo-bak-metal-coating.png	\N	logo-bak-metal-coating.png	image/png	7712	640	160	50	50	/api/media/file/logo-bak-metal-coating-480x360.png	480	360	image/png	27926	logo-bak-metal-coating-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-bak-metal-coating-600x150.png	600	150	image/png	16428	logo-bak-metal-coating-600x150.png
27	2026-10-16 07:24:53.002+00	2026-10-16 07:24:53.002+00	/api/media/file/logo-erbil-surface-tech.png	\N	logo-erbil-surface-tech.png	image/png	6335	640	160	50	50	/api/media/file/logo-erbil-surface-tech-480x360.png	480	360	image/png	20871	logo-erbil-surface-tech-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-erbil-surface-tech-600x150.png	600	150	image/png	14950	logo-erbil-surface-tech-600x150.png
28	2026-10-16 07:24:53.138+00	2026-10-16 07:24:53.138+00	/api/media/file/logo-cairo-electroplating.png	\N	logo-cairo-electroplating.png	image/png	7966	640	160	50	50	/api/media/file/logo-cairo-electroplating-480x360.png	480	360	image/png	28932	logo-cairo-electroplating-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-cairo-electroplating-600x150.png	600	150	image/png	17126	logo-cairo-electroplating-600x150.png
29	2026-10-16 07:24:53.248+00	2026-10-16 07:24:53.248+00	/api/media/file/logo-tashkent-coating.png	\N	logo-tashkent-coating.png	image/png	6150	640	160	50	50	/api/media/file/logo-tashkent-coating-480x360.png	480	360	image/png	24648	logo-tashkent-coating-480x360.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/logo-tashkent-coating-600x150.png	600	150	image/png	12870	logo-tashkent-coating-600x150.png
30	2026-10-21 09:06:05.781+00	2026-10-21 09:06:05.688+00	/api/media/file/catalca-depo-1.jpg	/api/media/file/catalca-depo-1-480x360.jpg	catalca-depo-1.jpg	image/jpeg	377135	1448	1086	50	50	/api/media/file/catalca-depo-1-480x360.jpg	480	360	image/jpeg	52381	catalca-depo-1-480x360.jpg	/api/media/file/catalca-depo-1-960x720.jpg	960	720	image/jpeg	183082	catalca-depo-1-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/catalca-depo-1-600x450.jpg	600	450	image/jpeg	80158	catalca-depo-1-600x450.jpg
31	2026-10-21 09:06:06.022+00	2026-10-21 09:06:05.953+00	/api/media/file/catalca-depo-2.jpg	/api/media/file/catalca-depo-2-480x360.jpg	catalca-depo-2.jpg	image/jpeg	389418	1672	941	50	50	/api/media/file/catalca-depo-2-480x360.jpg	480	360	image/jpeg	52416	catalca-depo-2-480x360.jpg	/api/media/file/catalca-depo-2-960x720.jpg	960	720	image/jpeg	177368	catalca-depo-2-960x720.jpg	/api/media/file/catalca-depo-2-1600x900.jpg	1600	900	image/jpeg	339989	catalca-depo-2-1600x900.jpg	\N	\N	\N	\N	\N	\N	/api/media/file/catalca-depo-2-600x338.jpg	600	338	image/jpeg	63637	catalca-depo-2-600x338.jpg
32	2026-10-21 09:06:06.259+00	2026-10-21 09:06:06.183+00	/api/media/file/catalca-depo-3.jpg	/api/media/file/catalca-depo-3-480x360.jpg	catalca-depo-3.jpg	image/jpeg	284677	940	1674	50	50	/api/media/file/catalca-depo-3-480x360.jpg	480	360	image/jpeg	43179	catalca-depo-3-480x360.jpg	/api/media/file/catalca-depo-3-960x720.jpg	960	720	image/jpeg	130236	catalca-depo-3-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/catalca-depo-3-600x1069.jpg	600	1069	image/jpeg	123387	catalca-depo-3-600x1069.jpg
33	2026-10-21 09:06:06.502+00	2026-10-21 09:06:06.428+00	/api/media/file/konteyner-kostik-soda.jpg	/api/media/file/konteyner-kostik-soda-480x360.jpg	konteyner-kostik-soda.jpg	image/jpeg	308530	1024	1536	50	50	/api/media/file/konteyner-kostik-soda-480x360.jpg	480	360	image/jpeg	39966	konteyner-kostik-soda-480x360.jpg	/api/media/file/konteyner-kostik-soda-960x720.jpg	960	720	image/jpeg	141635	konteyner-kostik-soda-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/konteyner-kostik-soda-600x900.jpg	600	900	image/jpeg	115072	konteyner-kostik-soda-600x900.jpg
34	2026-10-21 09:06:06.767+00	2026-10-21 09:06:06.696+00	/api/media/file/treyler-krom-trioksit.jpg	/api/media/file/treyler-krom-trioksit-480x360.jpg	treyler-krom-trioksit.jpg	image/jpeg	330501	940	1674	50	50	/api/media/file/treyler-krom-trioksit-480x360.jpg	480	360	image/jpeg	46006	treyler-krom-trioksit-480x360.jpg	/api/media/file/treyler-krom-trioksit-960x720.jpg	960	720	image/jpeg	140954	treyler-krom-trioksit-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/treyler-krom-trioksit-600x1069.jpg	600	1069	image/jpeg	150655	treyler-krom-trioksit-600x1069.jpg
35	2026-10-21 09:06:07.003+00	2026-10-21 09:06:06.931+00	/api/media/file/cinko-klorur-torbalar.jpg	/api/media/file/cinko-klorur-torbalar-480x360.jpg	cinko-klorur-torbalar.jpg	image/jpeg	287121	1122	1402	50	50	/api/media/file/cinko-klorur-torbalar-480x360.jpg	480	360	image/jpeg	50420	cinko-klorur-torbalar-480x360.jpg	/api/media/file/cinko-klorur-torbalar-960x720.jpg	960	720	image/jpeg	155796	cinko-klorur-torbalar-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/cinko-klorur-torbalar-600x750.jpg	600	750	image/jpeg	107967	cinko-klorur-torbalar-600x750.jpg
36	2026-10-21 09:06:07.262+00	2026-10-21 09:06:07.133+00	/api/media/file/cinko-klorur-25kg.jpg	/api/media/file/cinko-klorur-25kg-480x360.jpg	cinko-klorur-25kg.jpg	image/jpeg	152999	1085	1450	50	50	/api/media/file/cinko-klorur-25kg-480x360.jpg	480	360	image/jpeg	30615	cinko-klorur-25kg-480x360.jpg	/api/media/file/cinko-klorur-25kg-960x720.jpg	960	720	image/jpeg	81169	cinko-klorur-25kg-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/cinko-klorur-25kg-600x802.jpg	600	802	image/jpeg	68611	cinko-klorur-25kg-600x802.jpg
37	2026-10-21 09:06:07.55+00	2026-10-21 09:06:07.44+00	/api/media/file/amonyum-klorur.jpg	/api/media/file/amonyum-klorur-480x360.jpg	amonyum-klorur.jpg	image/jpeg	185210	1125	1398	50	50	/api/media/file/amonyum-klorur-480x360.jpg	480	360	image/jpeg	28948	amonyum-klorur-480x360.jpg	/api/media/file/amonyum-klorur-960x720.jpg	960	720	image/jpeg	94191	amonyum-klorur-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/amonyum-klorur-600x746.jpg	600	746	image/jpeg	65558	amonyum-klorur-600x746.jpg
38	2026-10-21 09:06:07.813+00	2026-10-21 09:06:07.665+00	/api/media/file/baryum-klorur.jpg	/api/media/file/baryum-klorur-480x360.jpg	baryum-klorur.jpg	image/jpeg	169321	1086	1448	50	50	/api/media/file/baryum-klorur-480x360.jpg	480	360	image/jpeg	26870	baryum-klorur-480x360.jpg	/api/media/file/baryum-klorur-960x720.jpg	960	720	image/jpeg	86933	baryum-klorur-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/baryum-klorur-600x800.jpg	600	800	image/jpeg	62132	baryum-klorur-600x800.jpg
39	2026-10-21 09:06:08.077+00	2026-10-21 09:06:08.001+00	/api/media/file/sodyum-nitrat.jpg	/api/media/file/sodyum-nitrat-480x360.jpg	sodyum-nitrat.jpg	image/jpeg	161408	1086	1448	50	50	/api/media/file/sodyum-nitrat-480x360.jpg	480	360	image/jpeg	30784	sodyum-nitrat-480x360.jpg	/api/media/file/sodyum-nitrat-960x720.jpg	960	720	image/jpeg	85432	sodyum-nitrat-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/sodyum-nitrat-600x800.jpg	600	800	image/jpeg	66623	sodyum-nitrat-600x800.jpg
40	2026-10-21 09:06:08.341+00	2026-10-21 09:06:08.245+00	/api/media/file/bakir-sulfat.jpg	/api/media/file/bakir-sulfat-480x360.jpg	bakir-sulfat.jpg	image/jpeg	139012	1254	1254	50	50	/api/media/file/bakir-sulfat-480x360.jpg	480	360	image/jpeg	27617	bakir-sulfat-480x360.jpg	/api/media/file/bakir-sulfat-960x720.jpg	960	720	image/jpeg	79865	bakir-sulfat-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/bakir-sulfat-600x600.jpg	600	600	image/jpeg	44203	bakir-sulfat-600x600.jpg
41	2026-10-21 09:06:08.544+00	2026-10-21 09:06:08.459+00	/api/media/file/sodyum-siyanur-varil.jpg	/api/media/file/sodyum-siyanur-varil-480x360.jpg	sodyum-siyanur-varil.jpg	image/jpeg	111791	1086	1448	50	50	/api/media/file/sodyum-siyanur-varil-480x360.jpg	480	360	image/jpeg	23371	sodyum-siyanur-varil-480x360.jpg	/api/media/file/sodyum-siyanur-varil-960x720.jpg	960	720	image/jpeg	64035	sodyum-siyanur-varil-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/sodyum-siyanur-varil-600x800.jpg	600	800	image/jpeg	45351	sodyum-siyanur-varil-600x800.jpg
42	2026-10-21 09:06:08.729+00	2026-10-21 09:06:08.674+00	/api/media/file/sodyum-siyanur-fici.jpg	/api/media/file/sodyum-siyanur-fici-480x360.jpg	sodyum-siyanur-fici.jpg	image/jpeg	132923	1254	1254	50	50	/api/media/file/sodyum-siyanur-fici-480x360.jpg	480	360	image/jpeg	23070	sodyum-siyanur-fici-480x360.jpg	/api/media/file/sodyum-siyanur-fici-960x720.jpg	960	720	image/jpeg	69180	sodyum-siyanur-fici-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/sodyum-siyanur-fici-600x600.jpg	600	600	image/jpeg	40212	sodyum-siyanur-fici-600x600.jpg
43	2026-10-21 09:06:08.875+00	2026-10-21 09:06:08.815+00	/api/media/file/sodyum-hidroksit-cuval.jpg	/api/media/file/sodyum-hidroksit-cuval-480x360.jpg	sodyum-hidroksit-cuval.jpg	image/jpeg	129116	1266	1243	50	50	/api/media/file/sodyum-hidroksit-cuval-480x360.jpg	480	360	image/jpeg	26660	sodyum-hidroksit-cuval-480x360.jpg	/api/media/file/sodyum-hidroksit-cuval-960x720.jpg	960	720	image/jpeg	73227	sodyum-hidroksit-cuval-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/sodyum-hidroksit-cuval-600x589.jpg	600	589	image/jpeg	45117	sodyum-hidroksit-cuval-600x589.jpg
44	2026-10-21 09:06:09.073+00	2026-10-21 09:06:09.01+00	/api/media/file/kostik-soda-cuval.jpg	/api/media/file/kostik-soda-cuval-480x360.jpg	kostik-soda-cuval.jpg	image/jpeg	224308	1035	1520	50	50	/api/media/file/kostik-soda-cuval-480x360.jpg	480	360	image/jpeg	46314	kostik-soda-cuval-480x360.jpg	/api/media/file/kostik-soda-cuval-960x720.jpg	960	720	image/jpeg	125708	kostik-soda-cuval-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/kostik-soda-cuval-600x881.jpg	600	881	image/jpeg	109897	kostik-soda-cuval-600x881.jpg
45	2026-10-21 09:06:09.22+00	2026-10-21 09:06:09.168+00	/api/media/file/kromik-asit-1.jpg	/api/media/file/kromik-asit-1-480x360.jpg	kromik-asit-1.jpg	image/jpeg	153317	1159	1357	50	50	/api/media/file/kromik-asit-1-480x360.jpg	480	360	image/jpeg	29022	kromik-asit-1-480x360.jpg	/api/media/file/kromik-asit-1-960x720.jpg	960	720	image/jpeg	80700	kromik-asit-1-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/kromik-asit-1-600x703.jpg	600	703	image/jpeg	54867	kromik-asit-1-600x703.jpg
46	2026-10-21 09:06:09.353+00	2026-10-21 09:06:09.308+00	/api/media/file/kromik-asit-2.jpg	/api/media/file/kromik-asit-2-480x360.jpg	kromik-asit-2.jpg	image/jpeg	176876	1144	1375	50	50	/api/media/file/kromik-asit-2-480x360.jpg	480	360	image/jpeg	32966	kromik-asit-2-480x360.jpg	/api/media/file/kromik-asit-2-960x720.jpg	960	720	image/jpeg	88413	kromik-asit-2-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/kromik-asit-2-600x721.jpg	600	721	image/jpeg	68148	kromik-asit-2-600x721.jpg
47	2026-10-21 09:06:09.521+00	2026-10-21 09:06:09.463+00	/api/media/file/kimyasal-varil-mavi.jpg	/api/media/file/kimyasal-varil-mavi-480x360.jpg	kimyasal-varil-mavi.jpg	image/jpeg	144556	1086	1448	50	50	/api/media/file/kimyasal-varil-mavi-480x360.jpg	480	360	image/jpeg	20234	kimyasal-varil-mavi-480x360.jpg	/api/media/file/kimyasal-varil-mavi-960x720.jpg	960	720	image/jpeg	66072	kimyasal-varil-mavi-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/kimyasal-varil-mavi-600x800.jpg	600	800	image/jpeg	48944	kimyasal-varil-mavi-600x800.jpg
48	2026-10-21 09:06:09.721+00	2026-10-21 09:06:09.657+00	/api/media/file/potasyum-hidroksit.jpg	/api/media/file/potasyum-hidroksit-480x360.jpg	potasyum-hidroksit.jpg	image/jpeg	186548	1147	1371	50	50	/api/media/file/potasyum-hidroksit-480x360.jpg	480	360	image/jpeg	27125	potasyum-hidroksit-480x360.jpg	/api/media/file/potasyum-hidroksit-960x720.jpg	960	720	image/jpeg	85145	potasyum-hidroksit-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/potasyum-hidroksit-600x717.jpg	600	717	image/jpeg	68717	potasyum-hidroksit-600x717.jpg
49	2026-10-21 09:06:09.942+00	2026-10-21 09:06:09.859+00	/api/media/file/potasyum-klorur.jpg	/api/media/file/potasyum-klorur-480x360.jpg	potasyum-klorur.jpg	image/jpeg	150548	1126	1397	50	50	/api/media/file/potasyum-klorur-480x360.jpg	480	360	image/jpeg	25778	potasyum-klorur-480x360.jpg	/api/media/file/potasyum-klorur-960x720.jpg	960	720	image/jpeg	76103	potasyum-klorur-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/potasyum-klorur-600x744.jpg	600	744	image/jpeg	54896	potasyum-klorur-600x744.jpg
50	2026-10-21 09:06:10.09+00	2026-10-21 09:06:10.043+00	/api/media/file/potasyum-siyanur.jpg	/api/media/file/potasyum-siyanur-480x360.jpg	potasyum-siyanur.jpg	image/jpeg	88958	1254	1254	50	50	/api/media/file/potasyum-siyanur-480x360.jpg	480	360	image/jpeg	16941	potasyum-siyanur-480x360.jpg	/api/media/file/potasyum-siyanur-960x720.jpg	960	720	image/jpeg	47254	potasyum-siyanur-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/potasyum-siyanur-600x600.jpg	600	600	image/jpeg	28846	potasyum-siyanur-600x600.jpg
51	2026-10-21 09:06:10.442+00	2026-10-21 09:06:10.289+00	/api/media/file/sodyum-bikromat.jpg	/api/media/file/sodyum-bikromat-480x360.jpg	sodyum-bikromat.jpg	image/jpeg	215264	1126	1397	50	50	/api/media/file/sodyum-bikromat-480x360.jpg	480	360	image/jpeg	33960	sodyum-bikromat-480x360.jpg	/api/media/file/sodyum-bikromat-960x720.jpg	960	720	image/jpeg	108627	sodyum-bikromat-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/sodyum-bikromat-600x744.jpg	600	744	image/jpeg	71206	sodyum-bikromat-600x744.jpg
52	2026-10-21 09:06:10.777+00	2026-10-21 09:06:10.647+00	/api/media/file/sodyum-metabisulfit.jpg	/api/media/file/sodyum-metabisulfit-480x360.jpg	sodyum-metabisulfit.jpg	image/jpeg	140002	1254	1254	50	50	/api/media/file/sodyum-metabisulfit-480x360.jpg	480	360	image/jpeg	26030	sodyum-metabisulfit-480x360.jpg	/api/media/file/sodyum-metabisulfit-960x720.jpg	960	720	image/jpeg	83716	sodyum-metabisulfit-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/sodyum-metabisulfit-600x600.jpg	600	600	image/jpeg	44341	sodyum-metabisulfit-600x600.jpg
53	2026-10-21 09:06:11.139+00	2026-10-21 09:06:10.997+00	/api/media/file/hidrojen-peroksit.jpg	/api/media/file/hidrojen-peroksit-480x360.jpg	hidrojen-peroksit.jpg	image/jpeg	103774	1122	1402	50	50	/api/media/file/hidrojen-peroksit-480x360.jpg	480	360	image/jpeg	22289	hidrojen-peroksit-480x360.jpg	/api/media/file/hidrojen-peroksit-960x720.jpg	960	720	image/jpeg	60756	hidrojen-peroksit-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/hidrojen-peroksit-600x750.jpg	600	750	image/jpeg	39747	hidrojen-peroksit-600x750.jpg
54	2026-10-21 09:06:11.33+00	2026-10-21 09:06:11.264+00	/api/media/file/izopropil-alkol.jpg	/api/media/file/izopropil-alkol-480x360.jpg	izopropil-alkol.jpg	image/jpeg	114719	1122	1402	50	50	/api/media/file/izopropil-alkol-480x360.jpg	480	360	image/jpeg	21349	izopropil-alkol-480x360.jpg	/api/media/file/izopropil-alkol-960x720.jpg	960	720	image/jpeg	61430	izopropil-alkol-960x720.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	/api/media/file/izopropil-alkol-600x750.jpg	600	750	image/jpeg	41757	izopropil-alkol-600x750.jpg
\.


ALTER TABLE public.media ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v DISABLE TRIGGER ALL;

COPY public._about_page_v (id, version_hero_image_id, version_updated_at, version_created_at, created_at, updated_at, version_cta_image_id) FROM stdin;
1	30	2026-10-21 09:06:15.062+00	2026-10-15 13:31:35.467+00	2026-10-21 09:06:15.086+00	2026-10-21 09:06:15.086+00	\N
2	30	2026-10-22 10:14:59.498+00	2026-10-15 13:31:35.467+00	2026-10-22 10:14:59.618+00	2026-10-22 10:14:59.618+00	32
3	30	2026-10-22 10:14:59.805+00	2026-10-15 13:31:35.467+00	2026-10-22 10:14:59.914+00	2026-10-22 10:14:59.914+00	32
4	30	2026-10-30 06:42:27.108+00	2026-10-15 13:31:35.467+00	2026-10-30 06:42:27.217+00	2026-10-30 06:42:27.217+00	32
5	30	2026-10-30 06:55:59.459+00	2026-10-15 13:31:35.467+00	2026-10-30 06:55:59.513+00	2026-10-30 06:55:59.513+00	32
6	30	2026-10-30 06:56:55.395+00	2026-10-15 13:31:35.467+00	2026-10-30 06:56:55.463+00	2026-10-30 06:56:55.463+00	32
\.


ALTER TABLE public._about_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_locales (version_hero_title, version_hero_subtitle, version_intro, version_gallery_title, id, _locale, _parent_id, version_meta_title, version_meta_description, version_meta_image_id, version_company_eyebrow, version_company_title, version_company_body, version_services_eyebrow, version_services_title, version_services_intro, version_sectors_title, version_sectors_text, version_values_title, version_timeline_title, version_cta_title, version_cta_text) FROM stdin;
Hakkımızda	Dünyadan hammadde, sektöre güven.	Güven Galvano Kimyasalları, kaplama sektörüne ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik eder ve bölgedeki üreticilere ulaştırır.	Tesisten kareler	1	tr	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
About Us	Raw materials from the world, trust for the industry.	Güven Galvano Kimyasalları sources the raw materials the plating industry needs from all over the world and delivers them to manufacturers across the region.	From our facility	2	en	1	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
Hakkımızda	Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.	Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.	Depodan ve sevkiyattan kareler	3	tr	2	\N	\N	\N	Biz kimiz	Kaplama sektörünün hammadde tedarikçisi	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	Ne yapıyoruz	Kaynaktan banyonuza kadar tedarik zinciri	Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.	Hizmet verdiğimiz prosesler	Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.	Çalışma ilkelerimiz	Yolculuğumuz	İhtiyacınız olan hammadde stokta olabilir	Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.
About Us	Raw materials from the world, trust for the industry.	Güven Galvano Kimyasalları sources the raw materials the plating industry needs from all over the world and delivers them to manufacturers across the region.	From our facility	4	en	2	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
Hakkımızda	Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.	Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.	Depodan ve sevkiyattan kareler	5	tr	3	\N	\N	\N	Biz kimiz	Kaplama sektörünün hammadde tedarikçisi	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	Ne yapıyoruz	Kaynaktan banyonuza kadar tedarik zinciri	Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.	Hizmet verdiğimiz prosesler	Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.	Çalışma ilkelerimiz	Yolculuğumuz	İhtiyacınız olan hammadde stokta olabilir	Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.
About Us	Raw materials from around the world for the plating industry, delivered reliably from Çatalca.	We source, stock and deliver on time the raw materials that plating companies need, from all over the world.	From our warehouse and shipments	6	en	3	\N	\N	\N	Who we are	Raw material supplier to the plating industry	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları is an import, export and wholesale company supplying raw materials to the electroplating and surface treatment industry. We do not do plating ourselves; we source the metal salts, acids and bases, anodes and auxiliary chemicals used in plating baths and deliver them on time.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Working with producers in Europe and Asia, we offer a wide range from nickel, copper and zinc salts to chromic acid, from cyanide salts to caustic soda — all from a single supplier. Products are delivered in their original packaging with the producer’s labels and documents.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Our warehouse in Çatalca, Istanbul, lets us keep frequently used raw materials in stock and dispatch orders quickly. We offer delivery options to suit every need, from bags and drums to IBC tanks and bulk shipments.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Besides plating companies across Türkiye, we export to customers in neighbouring markets. Documents such as technical data sheets (TDS) and safety data sheets (MSDS) are shared with the product on request.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	What we do	The supply chain from source to your bath	We manage every step from buying at the producer to delivery at your plant, so you can focus on production.	Processes we serve	Our products are used for bath make-up and replenishment across many plating and surface treatment processes.	How we work	Our journey	The raw material you need may already be in stock	Browse our catalogue or add your needs to the quote basket and we will get back to you shortly.
Hakkımızda	Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.	Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.	Depodan ve sevkiyattan kareler	7	tr	4	\N	\N	\N	Biz kimiz	Kaplama sektörünün hammadde tedarikçisi	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	Ne yapıyoruz	Kaynaktan banyonuza kadar tedarik zinciri	Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.	Hizmet verdiğimiz prosesler	Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.	Çalışma ilkelerimiz	Yolculuğumuz	İhtiyacınız olan hammadde stokta olabilir	Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.
About Us	Raw materials from around the world for the plating industry, delivered reliably from Çatalca.	We source, stock and deliver on time the raw materials that plating companies need, from all over the world.	From our warehouse and shipments	8	en	4	\N	\N	\N	Who we are	Raw material supplier to the plating industry	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları is an import, export and wholesale company supplying raw materials to the electroplating and surface treatment industry. We do not do plating ourselves; we source the metal salts, acids and bases, anodes and auxiliary chemicals used in plating baths and deliver them on time.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Working with producers in Europe and Asia, we offer a wide range from nickel, copper and zinc salts to chromic acid, from cyanide salts to caustic soda — all from a single supplier. Products are delivered in their original packaging with the producer’s labels and documents.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Our warehouse in Çatalca, Istanbul, lets us keep frequently used raw materials in stock and dispatch orders quickly. We offer delivery options to suit every need, from bags and drums to IBC tanks and bulk shipments.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Besides plating companies across Türkiye, we export to customers in neighbouring markets. Documents such as technical data sheets (TDS) and safety data sheets (MSDS) are shared with the product on request.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	What we do	The supply chain from source to your bath	We manage every step from buying at the producer to delivery at your plant, so you can focus on production.	Processes we serve	Our products are used for bath make-up and replenishment across many plating and surface treatment processes.	How we work	Our journey	The raw material you need may already be in stock	Browse our catalogue or add your needs to the quote basket and we will get back to you shortly.
Hakkımızda	Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.	Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.	Depodan ve sevkiyattan kareler	9	tr	5	\N	\N	\N	Biz kimiz	Kaplama sektörünün hammadde tedarikçisi	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	Ne yapıyoruz	Kaynaktan banyonuza kadar tedarik zinciri	Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.	Hizmet verdiğimiz prosesler	Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.	Çalışma ilkelerimiz	Yolculuğumuz	İhtiyacınız olan hammadde stokta olabilir	Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.
About Us	Raw materials from around the world for the plating industry, delivered reliably from Çatalca.	We source, stock and deliver on time the raw materials that plating companies need, from all over the world.	From our warehouse and shipments	10	en	5	\N	\N	\N	Who we are	Raw material supplier to the plating industry	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları is an import, export and wholesale company supplying raw materials to the electroplating and surface treatment industry. We do not do plating ourselves; we source the metal salts, acids and bases, anodes and auxiliary chemicals used in plating baths and deliver them on time.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Working with producers in Europe and Asia, we offer a wide range from nickel, copper and zinc salts to chromic acid, from cyanide salts to caustic soda — all from a single supplier. Products are delivered in their original packaging with the producer’s labels and documents.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Our warehouse in Çatalca, Istanbul, lets us keep frequently used raw materials in stock and dispatch orders quickly. We offer delivery options to suit every need, from bags and drums to IBC tanks and bulk shipments.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Besides plating companies across Türkiye, we export to customers in neighbouring markets. Documents such as technical data sheets (TDS) and safety data sheets (MSDS) are shared with the product on request.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	What we do	The supply chain from source to your bath	We manage every step from buying at the producer to delivery at your plant, so you can focus on production.	Processes we serve	Our products are used for bath make-up and replenishment across many plating and surface treatment processes.	How we work	Our journey	The raw material you need may already be in stock	Browse our catalogue or add your needs to the quote basket and we will get back to you shortly.
Hakkımızda	Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.	Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.	Depodan ve sevkiyattan kareler	11	tr	6	\N	\N	\N	Biz kimiz	Kaplama sektörünün hammadde tedarikçisi	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	Ne yapıyoruz	Kaynaktan banyonuza kadar tedarik zinciri	Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.	Hizmet verdiğimiz prosesler	Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.	Çalışma ilkelerimiz	Yolculuğumuz	İhtiyacınız olan hammadde stokta olabilir	Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.
About Us	Raw materials from around the world for the plating industry, delivered reliably from Çatalca.	We source, stock and deliver on time the raw materials that plating companies need, from all over the world.	From our warehouse and shipments	12	en	6	\N	\N	\N	Who we are	Raw material supplier to the plating industry	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları is an import, export and wholesale company supplying raw materials to the electroplating and surface treatment industry. We do not do plating ourselves; we source the metal salts, acids and bases, anodes and auxiliary chemicals used in plating baths and deliver them on time.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Working with producers in Europe and Asia, we offer a wide range from nickel, copper and zinc salts to chromic acid, from cyanide salts to caustic soda — all from a single supplier. Products are delivered in their original packaging with the producer’s labels and documents.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Our warehouse in Çatalca, Istanbul, lets us keep frequently used raw materials in stock and dispatch orders quickly. We offer delivery options to suit every need, from bags and drums to IBC tanks and bulk shipments.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Besides plating companies across Türkiye, we export to customers in neighbouring markets. Documents such as technical data sheets (TDS) and safety data sheets (MSDS) are shared with the product on request.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	What we do	The supply chain from source to your bath	We manage every step from buying at the producer to delivery at your plant, so you can focus on production.	Processes we serve	Our products are used for bath make-up and replenishment across many plating and surface treatment processes.	How we work	Our journey	The raw material you need may already be in stock	Browse our catalogue or add your needs to the quote basket and we will get back to you shortly.
\.


ALTER TABLE public._about_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_rels; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_rels DISABLE TRIGGER ALL;

COPY public._about_page_v_rels (id, "order", parent_id, path, media_id) FROM stdin;
1	1	1	version.gallery.images	30
2	2	1	version.gallery.images	31
3	3	1	version.gallery.images	32
4	4	1	version.gallery.images	33
5	5	1	version.gallery.images	34
6	6	1	version.gallery.images	35
7	1	2	version.gallery.images	30
8	2	2	version.gallery.images	31
9	3	2	version.gallery.images	32
10	4	2	version.gallery.images	33
11	5	2	version.gallery.images	34
12	6	2	version.gallery.images	35
13	1	3	version.gallery.images	30
14	2	3	version.gallery.images	31
15	3	3	version.gallery.images	32
16	4	3	version.gallery.images	33
17	5	3	version.gallery.images	34
18	6	3	version.gallery.images	35
19	1	4	version.gallery.images	30
20	2	4	version.gallery.images	31
21	3	4	version.gallery.images	32
22	4	4	version.gallery.images	33
23	5	4	version.gallery.images	34
24	6	4	version.gallery.images	35
25	1	5	version.gallery.images	30
26	2	5	version.gallery.images	31
27	3	5	version.gallery.images	32
28	4	5	version.gallery.images	33
29	5	5	version.gallery.images	34
30	6	5	version.gallery.images	35
31	1	6	version.gallery.images	30
32	2	6	version.gallery.images	31
33	3	6	version.gallery.images	32
34	4	6	version.gallery.images	33
35	5	6	version.gallery.images	34
36	6	6	version.gallery.images	35
\.


ALTER TABLE public._about_page_v_rels ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_company_facts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_company_facts DISABLE TRIGGER ALL;

COPY public._about_page_v_version_company_facts (_order, _parent_id, id, _uuid) FROM stdin;
1	2	1	6ad9e22364bf1cbb40c0e038
2	2	2	6ad9e22364bf1cbb40c0e039
3	2	3	6ad9e22364bf1cbb40c0e03a
4	2	4	6ad9e22364bf1cbb40c0e03b
5	2	5	6ad9e22364bf1cbb40c0e03c
1	3	6	6ad9e22364bf1cbb40c0e038
2	3	7	6ad9e22364bf1cbb40c0e039
3	3	8	6ad9e22364bf1cbb40c0e03a
4	3	9	6ad9e22364bf1cbb40c0e03b
5	3	10	6ad9e22364bf1cbb40c0e03c
1	4	11	6ad9e22364bf1cbb40c0e038
2	4	12	6ad9e22364bf1cbb40c0e039
3	4	13	6ad9e22364bf1cbb40c0e03a
4	4	14	6ad9e22364bf1cbb40c0e03b
5	4	15	6ad9e22364bf1cbb40c0e03c
1	5	16	6ad9e22364bf1cbb40c0e038
2	5	17	6ae43f7fb95733a7c8a4bcb4
3	5	18	6ad9e22364bf1cbb40c0e039
4	5	19	6ad9e22364bf1cbb40c0e03a
5	5	20	6ad9e22364bf1cbb40c0e03b
6	5	21	6ad9e22364bf1cbb40c0e03c
1	6	22	6ad9e22364bf1cbb40c0e038
2	6	23	6ae43f7fb95733a7c8a4bcb4
3	6	24	6ad9e22364bf1cbb40c0e039
4	6	25	6ad9e22364bf1cbb40c0e03a
5	6	26	6ad9e22364bf1cbb40c0e03b
6	6	27	6ad9e22364bf1cbb40c0e03c
\.


ALTER TABLE public._about_page_v_version_company_facts ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_company_facts_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_company_facts_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_company_facts_locales (label, value, id, _locale, _parent_id) FROM stdin;
Merkez & depo	Çatalca, İstanbul	1	tr	1
Faaliyet alanı	İthalat · İhracat · Toptan	2	tr	2
Ürün yelpazesi	26+ ürün, 6 grup	3	tr	3
Ambalaj	Torba · Varil · IBC · Dökme	4	tr	4
Teknik belgeler	TDS / MSDS talep üzerine	5	tr	5
Merkez & depo	Çatalca, İstanbul	6	tr	6
Head office & warehouse	Çatalca, Istanbul	7	en	6
Faaliyet alanı	İthalat · İhracat · Toptan	8	tr	7
Business	Import · Export · Wholesale	9	en	7
Ürün yelpazesi	26+ ürün, 6 grup	10	tr	8
Product range	26+ products, 6 groups	11	en	8
Ambalaj	Torba · Varil · IBC · Dökme	12	tr	9
Packaging	Bag · Drum · IBC · Bulk	13	en	9
Teknik belgeler	TDS / MSDS talep üzerine	14	tr	10
Technical documents	TDS / MSDS on request	15	en	10
Merkez & depo	Çatalca, İstanbul	16	tr	11
Head office & warehouse	Çatalca, Istanbul	17	en	11
Faaliyet alanı	İthalat · İhracat · Toptan	18	tr	12
Business	Import · Export · Wholesale	19	en	12
Ürün yelpazesi	26+ ürün, 6 grup	20	tr	13
Product range	26+ products, 6 groups	21	en	13
Ambalaj	Torba · Varil · IBC · Dökme	22	tr	14
Packaging	Bag · Drum · IBC · Bulk	23	en	14
Teknik belgeler	TDS / MSDS talep üzerine	24	tr	15
Technical documents	TDS / MSDS on request	25	en	15
Merkez	İkitelli OSB, Başakşehir / İstanbul	26	tr	16
Head office & warehouse	Çatalca, Istanbul	27	en	16
Depo	Çatalca / İstanbul	28	tr	17
Faaliyet alanı	İthalat · İhracat · Toptan	29	tr	18
Business	Import · Export · Wholesale	30	en	18
Ürün yelpazesi	26+ ürün, 6 grup	31	tr	19
Product range	26+ products, 6 groups	32	en	19
Ambalaj	Torba · Varil · IBC · Dökme	33	tr	20
Packaging	Bag · Drum · IBC · Bulk	34	en	20
Teknik belgeler	TDS / MSDS talep üzerine	35	tr	21
Technical documents	TDS / MSDS on request	36	en	21
Merkez	İkitelli OSB, Başakşehir / İstanbul	37	tr	22
Head office	İkitelli OSB, Başakşehir / Istanbul	38	en	22
Depo	Çatalca / İstanbul	39	tr	23
Warehouse	Çatalca / Istanbul	40	en	23
Faaliyet alanı	İthalat · İhracat · Toptan	41	tr	24
Business	Import · Export · Wholesale	42	en	24
Ürün yelpazesi	26+ ürün, 6 grup	43	tr	25
Product range	26+ products, 6 groups	44	en	25
Ambalaj	Torba · Varil · IBC · Dökme	45	tr	26
Packaging	Bag · Drum · IBC · Bulk	46	en	26
Teknik belgeler	TDS / MSDS talep üzerine	47	tr	27
Technical documents	TDS / MSDS on request	48	en	27
\.


ALTER TABLE public._about_page_v_version_company_facts_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_sectors_items; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_sectors_items DISABLE TRIGGER ALL;

COPY public._about_page_v_version_sectors_items (_order, _parent_id, id, _uuid) FROM stdin;
1	2	1	6ad9e22364bf1cbb40c0e045
2	2	2	6ad9e22364bf1cbb40c0e046
3	2	3	6ad9e22364bf1cbb40c0e047
4	2	4	6ad9e22364bf1cbb40c0e048
5	2	5	6ad9e22364bf1cbb40c0e049
6	2	6	6ad9e22364bf1cbb40c0e04a
7	2	7	6ad9e22364bf1cbb40c0e04b
8	2	8	6ad9e22364bf1cbb40c0e04c
9	2	9	6ad9e22364bf1cbb40c0e04d
1	3	10	6ad9e22364bf1cbb40c0e045
2	3	11	6ad9e22364bf1cbb40c0e046
3	3	12	6ad9e22364bf1cbb40c0e047
4	3	13	6ad9e22364bf1cbb40c0e048
5	3	14	6ad9e22364bf1cbb40c0e049
6	3	15	6ad9e22364bf1cbb40c0e04a
7	3	16	6ad9e22364bf1cbb40c0e04b
8	3	17	6ad9e22364bf1cbb40c0e04c
9	3	18	6ad9e22364bf1cbb40c0e04d
1	4	19	6ad9e22364bf1cbb40c0e045
2	4	20	6ad9e22364bf1cbb40c0e046
3	4	21	6ad9e22364bf1cbb40c0e047
4	4	22	6ad9e22364bf1cbb40c0e048
5	4	23	6ad9e22364bf1cbb40c0e049
6	4	24	6ad9e22364bf1cbb40c0e04a
7	4	25	6ad9e22364bf1cbb40c0e04b
8	4	26	6ad9e22364bf1cbb40c0e04c
9	4	27	6ad9e22364bf1cbb40c0e04d
1	5	28	6ad9e22364bf1cbb40c0e045
2	5	29	6ad9e22364bf1cbb40c0e046
3	5	30	6ad9e22364bf1cbb40c0e047
4	5	31	6ad9e22364bf1cbb40c0e048
5	5	32	6ad9e22364bf1cbb40c0e049
6	5	33	6ad9e22364bf1cbb40c0e04a
7	5	34	6ad9e22364bf1cbb40c0e04b
8	5	35	6ad9e22364bf1cbb40c0e04c
9	5	36	6ad9e22364bf1cbb40c0e04d
1	6	37	6ad9e22364bf1cbb40c0e045
2	6	38	6ad9e22364bf1cbb40c0e046
3	6	39	6ad9e22364bf1cbb40c0e047
4	6	40	6ad9e22364bf1cbb40c0e048
5	6	41	6ad9e22364bf1cbb40c0e049
6	6	42	6ad9e22364bf1cbb40c0e04a
7	6	43	6ad9e22364bf1cbb40c0e04b
8	6	44	6ad9e22364bf1cbb40c0e04c
9	6	45	6ad9e22364bf1cbb40c0e04d
\.


ALTER TABLE public._about_page_v_version_sectors_items ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_sectors_items_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_sectors_items_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_sectors_items_locales (label, id, _locale, _parent_id) FROM stdin;
Nikel kaplama	1	tr	1
Krom kaplama	2	tr	2
Çinko kaplama	3	tr	3
Bakır kaplama	4	tr	4
Altın & değerli metal	5	tr	5
Pasivasyon	6	tr	6
Fosfat kaplama	7	tr	7
Yağ alma & ön işlem	8	tr	8
Atık su arıtımı	9	tr	9
Nikel kaplama	10	tr	10
Nickel plating	11	en	10
Krom kaplama	12	tr	11
Chrome plating	13	en	11
Çinko kaplama	14	tr	12
Zinc plating	15	en	12
Bakır kaplama	16	tr	13
Copper plating	17	en	13
Altın & değerli metal	18	tr	14
Gold & precious metals	19	en	14
Pasivasyon	20	tr	15
Passivation	21	en	15
Fosfat kaplama	22	tr	16
Phosphating	23	en	16
Yağ alma & ön işlem	24	tr	17
Degreasing & pre-treatment	25	en	17
Atık su arıtımı	26	tr	18
Wastewater treatment	27	en	18
Nikel kaplama	28	tr	19
Nickel plating	29	en	19
Krom kaplama	30	tr	20
Chrome plating	31	en	20
Çinko kaplama	32	tr	21
Zinc plating	33	en	21
Bakır kaplama	34	tr	22
Copper plating	35	en	22
Altın & değerli metal	36	tr	23
Gold & precious metals	37	en	23
Pasivasyon	38	tr	24
Passivation	39	en	24
Fosfat kaplama	40	tr	25
Phosphating	41	en	25
Yağ alma & ön işlem	42	tr	26
Degreasing & pre-treatment	43	en	26
Atık su arıtımı	44	tr	27
Wastewater treatment	45	en	27
Nikel kaplama	46	tr	28
Nickel plating	47	en	28
Krom kaplama	48	tr	29
Chrome plating	49	en	29
Çinko kaplama	50	tr	30
Zinc plating	51	en	30
Bakır kaplama	52	tr	31
Copper plating	53	en	31
Altın & değerli metal	54	tr	32
Gold & precious metals	55	en	32
Pasivasyon	56	tr	33
Passivation	57	en	33
Fosfat kaplama	58	tr	34
Phosphating	59	en	34
Yağ alma & ön işlem	60	tr	35
Degreasing & pre-treatment	61	en	35
Atık su arıtımı	62	tr	36
Wastewater treatment	63	en	36
Nikel kaplama	64	tr	37
Nickel plating	65	en	37
Krom kaplama	66	tr	38
Chrome plating	67	en	38
Çinko kaplama	68	tr	39
Zinc plating	69	en	39
Bakır kaplama	70	tr	40
Copper plating	71	en	40
Altın & değerli metal	72	tr	41
Gold & precious metals	73	en	41
Pasivasyon	74	tr	42
Passivation	75	en	42
Fosfat kaplama	76	tr	43
Phosphating	77	en	43
Yağ alma & ön işlem	78	tr	44
Degreasing & pre-treatment	79	en	44
Atık su arıtımı	80	tr	45
Wastewater treatment	81	en	45
\.


ALTER TABLE public._about_page_v_version_sectors_items_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_services_items; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_services_items DISABLE TRIGGER ALL;

COPY public._about_page_v_version_services_items (_order, _parent_id, id, icon, _uuid) FROM stdin;
1	2	1	globe	6ad9e22364bf1cbb40c0e041
2	2	2	warehouse	6ad9e22364bf1cbb40c0e042
3	2	3	truck	6ad9e22364bf1cbb40c0e043
4	2	4	document	6ad9e22364bf1cbb40c0e044
1	3	5	globe	6ad9e22364bf1cbb40c0e041
2	3	6	warehouse	6ad9e22364bf1cbb40c0e042
3	3	7	truck	6ad9e22364bf1cbb40c0e043
4	3	8	document	6ad9e22364bf1cbb40c0e044
1	4	9	globe	6ad9e22364bf1cbb40c0e041
2	4	10	warehouse	6ad9e22364bf1cbb40c0e042
3	4	11	truck	6ad9e22364bf1cbb40c0e043
4	4	12	document	6ad9e22364bf1cbb40c0e044
1	5	13	globe	6ad9e22364bf1cbb40c0e041
2	5	14	warehouse	6ad9e22364bf1cbb40c0e042
3	5	15	truck	6ad9e22364bf1cbb40c0e043
4	5	16	document	6ad9e22364bf1cbb40c0e044
1	6	17	globe	6ad9e22364bf1cbb40c0e041
2	6	18	warehouse	6ad9e22364bf1cbb40c0e042
3	6	19	truck	6ad9e22364bf1cbb40c0e043
4	6	20	document	6ad9e22364bf1cbb40c0e044
\.


ALTER TABLE public._about_page_v_version_services_items ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_services_items_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_services_items_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_services_items_locales (title, text, id, _locale, _parent_id) FROM stdin;
Tedarik & ithalat	Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.	1	tr	1
Depolama	Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.	2	tr	2
Sevkiyat & lojistik	Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.	3	tr	3
Belge desteği	TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.	4	tr	4
Tedarik & ithalat	Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.	5	tr	5
Sourcing & import	We buy directly from reliable producers and handle customs and import procedures for you.	6	en	5
Depolama	Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.	7	tr	6
Warehousing	We keep critical raw materials in stock at our Çatalca warehouse so your production never stops.	8	en	6
Sevkiyat & lojistik	Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.	9	tr	7
Shipping & logistics	Bags, drums, IBCs or bulk — we plan domestic and export shipments and deliver to your door.	10	en	7
Belge desteği	TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.	11	tr	8
Document support	We promptly provide product documents such as TDS, MSDS and certificates of origin on request.	12	en	8
Tedarik & ithalat	Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.	13	tr	9
Sourcing & import	We buy directly from reliable producers and handle customs and import procedures for you.	14	en	9
Depolama	Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.	15	tr	10
Warehousing	We keep critical raw materials in stock at our Çatalca warehouse so your production never stops.	16	en	10
Sevkiyat & lojistik	Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.	17	tr	11
Shipping & logistics	Bags, drums, IBCs or bulk — we plan domestic and export shipments and deliver to your door.	18	en	11
Belge desteği	TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.	19	tr	12
Document support	We promptly provide product documents such as TDS, MSDS and certificates of origin on request.	20	en	12
Tedarik & ithalat	Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.	21	tr	13
Sourcing & import	We buy directly from reliable producers and handle customs and import procedures for you.	22	en	13
Depolama	Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.	23	tr	14
Warehousing	We keep critical raw materials in stock at our Çatalca warehouse so your production never stops.	24	en	14
Sevkiyat & lojistik	Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.	25	tr	15
Shipping & logistics	Bags, drums, IBCs or bulk — we plan domestic and export shipments and deliver to your door.	26	en	15
Belge desteği	TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.	27	tr	16
Document support	We promptly provide product documents such as TDS, MSDS and certificates of origin on request.	28	en	16
Tedarik & ithalat	Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.	29	tr	17
Sourcing & import	We buy directly from reliable producers and handle customs and import procedures for you.	30	en	17
Depolama	Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.	31	tr	18
Warehousing	We keep critical raw materials in stock at our Çatalca warehouse so your production never stops.	32	en	18
Sevkiyat & lojistik	Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.	33	tr	19
Shipping & logistics	Bags, drums, IBCs or bulk — we plan domestic and export shipments and deliver to your door.	34	en	19
Belge desteği	TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.	35	tr	20
Document support	We promptly provide product documents such as TDS, MSDS and certificates of origin on request.	36	en	20
\.


ALTER TABLE public._about_page_v_version_services_items_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_stats; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_stats DISABLE TRIGGER ALL;

COPY public._about_page_v_version_stats (_order, _parent_id, id, value, suffix, _uuid) FROM stdin;
1	2	1	26	+	6ad9e22364bf1cbb40c0e03d
2	2	2	6		6ad9e22364bf1cbb40c0e03e
3	2	3	13		6ad9e22364bf1cbb40c0e03f
4	2	4	14	+	6ad9e22364bf1cbb40c0e040
1	3	5	26	+	6ad9e22364bf1cbb40c0e03d
2	3	6	6		6ad9e22364bf1cbb40c0e03e
3	3	7	13		6ad9e22364bf1cbb40c0e03f
4	3	8	14	+	6ad9e22364bf1cbb40c0e040
1	4	9	26	+	6ad9e22364bf1cbb40c0e03d
2	4	10	6		6ad9e22364bf1cbb40c0e03e
3	4	11	13		6ad9e22364bf1cbb40c0e03f
4	4	12	14	+	6ad9e22364bf1cbb40c0e040
1	5	13	26	+	6ad9e22364bf1cbb40c0e03d
2	5	14	6		6ad9e22364bf1cbb40c0e03e
3	5	15	13		6ad9e22364bf1cbb40c0e03f
4	5	16	14	+	6ad9e22364bf1cbb40c0e040
1	6	17	26	+	6ad9e22364bf1cbb40c0e03d
2	6	18	6		6ad9e22364bf1cbb40c0e03e
3	6	19	13		6ad9e22364bf1cbb40c0e03f
4	6	20	14	+	6ad9e22364bf1cbb40c0e040
\.


ALTER TABLE public._about_page_v_version_stats ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_stats_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_stats_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_stats_locales (label, id, _locale, _parent_id) FROM stdin;
Ürün	1	tr	1
Ürün grubu	2	tr	2
Kaplama prosesi	3	tr	3
Tedarik & ihracat noktası	4	tr	4
Ürün	5	tr	5
Products	6	en	5
Ürün grubu	7	tr	6
Product groups	8	en	6
Kaplama prosesi	9	tr	7
Plating processes	10	en	7
Tedarik & ihracat noktası	11	tr	8
Sourcing & export points	12	en	8
Ürün	13	tr	9
Products	14	en	9
Ürün grubu	15	tr	10
Product groups	16	en	10
Kaplama prosesi	17	tr	11
Plating processes	18	en	11
Tedarik & ihracat noktası	19	tr	12
Sourcing & export points	20	en	12
Ürün	21	tr	13
Products	22	en	13
Ürün grubu	23	tr	14
Product groups	24	en	14
Kaplama prosesi	25	tr	15
Plating processes	26	en	15
Tedarik & ihracat noktası	27	tr	16
Sourcing & export points	28	en	16
Ürün	29	tr	17
Products	30	en	17
Ürün grubu	31	tr	18
Product groups	32	en	18
Kaplama prosesi	33	tr	19
Plating processes	34	en	19
Tedarik & ihracat noktası	35	tr	20
Sourcing & export points	36	en	20
\.


ALTER TABLE public._about_page_v_version_stats_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_story; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_story DISABLE TRIGGER ALL;

COPY public._about_page_v_version_story (_order, _parent_id, id, image_id, _uuid) FROM stdin;
1	1	1	3	6ad0d5b7750a1f16844a0c1e
2	1	2	4	6ad0d5b7750a1f16844a0c1f
3	1	3	1	6ad0d5b7750a1f16844a0c20
1	2	4	3	6ad9e22364bf1cbb40c0e04e
2	2	5	31	6ad9e22364bf1cbb40c0e04f
3	2	6	33	6ad9e22364bf1cbb40c0e050
1	3	7	3	6ad9e22364bf1cbb40c0e04e
2	3	8	31	6ad9e22364bf1cbb40c0e04f
3	3	9	33	6ad9e22364bf1cbb40c0e050
1	4	10	3	6ad9e22364bf1cbb40c0e04e
2	4	11	31	6ad9e22364bf1cbb40c0e04f
3	4	12	33	6ad9e22364bf1cbb40c0e050
1	5	13	3	6ad9e22364bf1cbb40c0e04e
2	5	14	31	6ad9e22364bf1cbb40c0e04f
3	5	15	33	6ad9e22364bf1cbb40c0e050
1	6	16	3	6ad9e22364bf1cbb40c0e04e
2	6	17	31	6ad9e22364bf1cbb40c0e04f
3	6	18	33	6ad9e22364bf1cbb40c0e050
\.


ALTER TABLE public._about_page_v_version_story ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_story_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_story_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_story_locales (title, text, id, _locale, _parent_id) FROM stdin;
Küresel tedarik	Avrupa ve Asya’daki üreticilerden doğrudan ithalat.	1	tr	1
Global sourcing	Direct imports from producers in Europe and Asia.	2	en	1
Güçlü stok	Geniş depomuzla kritik hammaddeler her zaman hazır.	3	tr	2
Strong stock	Critical raw materials always ready in our warehouse.	4	en	2
İhracat ağı	Orta Doğu, Kafkasya, Orta Asya ve Kuzey Afrika’ya sevkiyat.	5	tr	3
Export network	Shipments to the Middle East, Caucasus, Central Asia and North Africa.	6	en	3
Küresel tedarik ağı	Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.	7	tr	4
Çatalca deposu	İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.	8	tr	5
İhracat ve sevkiyat	Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.	9	tr	6
Küresel tedarik ağı	Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.	10	tr	7
Global sourcing network	Long-standing relationships with producers in Europe and Asia let us buy raw materials directly at the source — meaning stable prices and continuous supply.\n\nWe follow market movements closely and keep our customers informed about prices and lead times in advance.	11	en	7
Çatalca deposu	İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.	12	tr	8
Çatalca warehouse	At our warehouse in Çatalca, Istanbul, we keep frequently used products in stock. Palletised storage and forklift loading let us prepare and dispatch orders quickly.\n\nChemicals are stored in their original packaging, separated by type and hazard class.	13	en	8
İhracat ve sevkiyat	Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.	14	tr	9
Export and shipping	Alongside regular deliveries to plating companies in Türkiye, we export to customers in neighbouring countries with full and part container loads.\n\nWe manage the whole process, including export documents, dangerous goods (ADR/IMDG) requirements and packaging choice.	15	en	9
Küresel tedarik ağı	Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.	16	tr	10
Global sourcing network	Long-standing relationships with producers in Europe and Asia let us buy raw materials directly at the source — meaning stable prices and continuous supply.\n\nWe follow market movements closely and keep our customers informed about prices and lead times in advance.	17	en	10
Çatalca deposu	İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.	18	tr	11
Çatalca warehouse	At our warehouse in Çatalca, Istanbul, we keep frequently used products in stock. Palletised storage and forklift loading let us prepare and dispatch orders quickly.\n\nChemicals are stored in their original packaging, separated by type and hazard class.	19	en	11
İhracat ve sevkiyat	Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.	20	tr	12
Export and shipping	Alongside regular deliveries to plating companies in Türkiye, we export to customers in neighbouring countries with full and part container loads.\n\nWe manage the whole process, including export documents, dangerous goods (ADR/IMDG) requirements and packaging choice.	21	en	12
Küresel tedarik ağı	Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.	22	tr	13
Global sourcing network	Long-standing relationships with producers in Europe and Asia let us buy raw materials directly at the source — meaning stable prices and continuous supply.\n\nWe follow market movements closely and keep our customers informed about prices and lead times in advance.	23	en	13
Çatalca deposu	İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.	24	tr	14
Çatalca warehouse	At our warehouse in Çatalca, Istanbul, we keep frequently used products in stock. Palletised storage and forklift loading let us prepare and dispatch orders quickly.\n\nChemicals are stored in their original packaging, separated by type and hazard class.	25	en	14
İhracat ve sevkiyat	Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.	26	tr	15
Export and shipping	Alongside regular deliveries to plating companies in Türkiye, we export to customers in neighbouring countries with full and part container loads.\n\nWe manage the whole process, including export documents, dangerous goods (ADR/IMDG) requirements and packaging choice.	27	en	15
Küresel tedarik ağı	Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.	28	tr	16
Global sourcing network	Long-standing relationships with producers in Europe and Asia let us buy raw materials directly at the source — meaning stable prices and continuous supply.\n\nWe follow market movements closely and keep our customers informed about prices and lead times in advance.	29	en	16
Çatalca deposu	İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.	30	tr	17
Çatalca warehouse	At our warehouse in Çatalca, Istanbul, we keep frequently used products in stock. Palletised storage and forklift loading let us prepare and dispatch orders quickly.\n\nChemicals are stored in their original packaging, separated by type and hazard class.	31	en	17
İhracat ve sevkiyat	Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.	32	tr	18
Export and shipping	Alongside regular deliveries to plating companies in Türkiye, we export to customers in neighbouring countries with full and part container loads.\n\nWe manage the whole process, including export documents, dangerous goods (ADR/IMDG) requirements and packaging choice.	33	en	18
\.


ALTER TABLE public._about_page_v_version_story_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_timeline; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_timeline DISABLE TRIGGER ALL;

COPY public._about_page_v_version_timeline (_order, _parent_id, id, year, _uuid) FROM stdin;
1	1	1	2000	6ad0d5b7750a1f16844a0c21
2	1	2	2008	6ad0d5b7750a1f16844a0c22
3	1	3	2015	6ad0d5b7750a1f16844a0c23
4	1	4	2024	6ad0d5b7750a1f16844a0c24
1	2	5	2000	6ad0d5b7750a1f16844a0c21
2	2	6	2008	6ad0d5b7750a1f16844a0c22
3	2	7	2015	6ad0d5b7750a1f16844a0c23
4	2	8	2024	6ad0d5b7750a1f16844a0c24
1	3	9	2000	6ad0d5b7750a1f16844a0c21
2	3	10	2008	6ad0d5b7750a1f16844a0c22
3	3	11	2015	6ad0d5b7750a1f16844a0c23
4	3	12	2024	6ad0d5b7750a1f16844a0c24
\.


ALTER TABLE public._about_page_v_version_timeline ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_timeline_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_timeline_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_timeline_locales (title, id, _locale, _parent_id, text) FROM stdin;
Kuruluş	1	tr	1	\N
Founded	2	en	1	\N
İlk ithalat anlaşmaları	3	tr	2	\N
First import agreements	4	en	2	\N
İhracat ağı genişledi	5	tr	3	\N
Export network expanded	6	en	3	\N
Yeni depo	7	tr	4	\N
New warehouse	8	en	4	\N
Kuruluş	9	tr	5	\N
Founded	10	en	5	\N
İlk ithalat anlaşmaları	11	tr	6	\N
First import agreements	12	en	6	\N
İhracat ağı genişledi	13	tr	7	\N
Export network expanded	14	en	7	\N
Yeni depo	15	tr	8	\N
New warehouse	16	en	8	\N
Kuruluş	17	tr	9	\N
Founded	18	en	9	\N
İlk ithalat anlaşmaları	19	tr	10	\N
First import agreements	20	en	10	\N
İhracat ağı genişledi	21	tr	11	\N
Export network expanded	22	en	11	\N
Yeni depo	23	tr	12	\N
New warehouse	24	en	12	\N
\.


ALTER TABLE public._about_page_v_version_timeline_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_values; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_values DISABLE TRIGGER ALL;

COPY public._about_page_v_version_values (_order, _parent_id, id, icon, _uuid) FROM stdin;
1	1	1	globe	6ad0d5b7750a1f16844a0c25
2	1	2	warehouse	6ad0d5b7750a1f16844a0c26
3	1	3	ship	6ad0d5b7750a1f16844a0c27
4	1	4	handshake	6ad0d5b7750a1f16844a0c28
1	2	5	handshake	6ad9e22364bf1cbb40c0e051
2	2	6	warehouse	6ad9e22364bf1cbb40c0e052
3	2	7	shield	6ad9e22364bf1cbb40c0e053
4	2	8	clock	6ad9e22364bf1cbb40c0e054
1	3	9	handshake	6ad9e22364bf1cbb40c0e051
2	3	10	warehouse	6ad9e22364bf1cbb40c0e052
3	3	11	shield	6ad9e22364bf1cbb40c0e053
4	3	12	clock	6ad9e22364bf1cbb40c0e054
1	4	13	handshake	6ad9e22364bf1cbb40c0e051
2	4	14	warehouse	6ad9e22364bf1cbb40c0e052
3	4	15	shield	6ad9e22364bf1cbb40c0e053
4	4	16	clock	6ad9e22364bf1cbb40c0e054
1	5	17	handshake	6ad9e22364bf1cbb40c0e051
2	5	18	warehouse	6ad9e22364bf1cbb40c0e052
3	5	19	shield	6ad9e22364bf1cbb40c0e053
4	5	20	clock	6ad9e22364bf1cbb40c0e054
1	6	21	handshake	6ad9e22364bf1cbb40c0e051
2	6	22	warehouse	6ad9e22364bf1cbb40c0e052
3	6	23	shield	6ad9e22364bf1cbb40c0e053
4	6	24	clock	6ad9e22364bf1cbb40c0e054
\.


ALTER TABLE public._about_page_v_version_values ENABLE TRIGGER ALL;

--
-- Data for Name: _about_page_v_version_values_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._about_page_v_version_values_locales DISABLE TRIGGER ALL;

COPY public._about_page_v_version_values_locales (title, text, id, _locale, _parent_id) FROM stdin;
Küresel ağ	30+ ülke	1	tr	1
Global network	30+ countries	2	en	1
Stok gücü	Hızlı teslimat	3	tr	2
Stock power	Fast delivery	4	en	2
Lojistik	Kapıdan kapıya	5	tr	3
Logistics	Door to door	6	en	3
Güven	Uzun soluklu ortaklık	7	tr	4
Trust	Long-term partnership	8	en	4
Güven	Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.	9	tr	5
Stok gücü	Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.	10	tr	6
Güvenli taşıma	Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.	11	tr	7
Hızlı yanıt	Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.	12	tr	8
Güven	Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.	13	tr	9
Trust	We live up to our name: the right product, the right quantity, delivered on time.	14	en	9
Stok gücü	Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.	15	tr	10
Stock strength	Keeping critical raw materials in stock helps your production run without interruption.	16	en	10
Güvenli taşıma	Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.	17	tr	11
Safe handling	Dangerous goods are moved with compliant packaging, labels and documents.	18	en	11
Hızlı yanıt	Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.	19	tr	12
Quick response	We aim to answer quote and document requests the same day.	20	en	12
Güven	Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.	21	tr	13
Trust	We live up to our name: the right product, the right quantity, delivered on time.	22	en	13
Stok gücü	Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.	23	tr	14
Stock strength	Keeping critical raw materials in stock helps your production run without interruption.	24	en	14
Güvenli taşıma	Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.	25	tr	15
Safe handling	Dangerous goods are moved with compliant packaging, labels and documents.	26	en	15
Hızlı yanıt	Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.	27	tr	16
Quick response	We aim to answer quote and document requests the same day.	28	en	16
Güven	Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.	29	tr	17
Trust	We live up to our name: the right product, the right quantity, delivered on time.	30	en	17
Stok gücü	Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.	31	tr	18
Stock strength	Keeping critical raw materials in stock helps your production run without interruption.	32	en	18
Güvenli taşıma	Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.	33	tr	19
Safe handling	Dangerous goods are moved with compliant packaging, labels and documents.	34	en	19
Hızlı yanıt	Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.	35	tr	20
Quick response	We aim to answer quote and document requests the same day.	36	en	20
Güven	Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.	37	tr	21
Trust	We live up to our name: the right product, the right quantity, delivered on time.	38	en	21
Stok gücü	Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.	39	tr	22
Stock strength	Keeping critical raw materials in stock helps your production run without interruption.	40	en	22
Güvenli taşıma	Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.	41	tr	23
Safe handling	Dangerous goods are moved with compliant packaging, labels and documents.	42	en	23
Hızlı yanıt	Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.	43	tr	24
Quick response	We aim to answer quote and document requests the same day.	44	en	24
\.


ALTER TABLE public._about_page_v_version_values_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _contact_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._contact_page_v DISABLE TRIGGER ALL;

COPY public._contact_page_v (id, version_hero_image_id, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
\.


ALTER TABLE public._contact_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _contact_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._contact_page_v_locales DISABLE TRIGGER ALL;

COPY public._contact_page_v_locales (version_hero_title, version_hero_subtitle, version_form_title, id, _locale, _parent_id, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
\.


ALTER TABLE public._contact_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v DISABLE TRIGGER ALL;

COPY public._home_page_v (id, version_hub_lat, version_hub_lng, version_showcase_image_id, version_showcase_video_id, version_cta_image_id, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
1	40.77	29.94	5	\N	2	2026-10-16 06:23:08.609+00	2026-10-15 13:31:34.688+00	2026-10-16 06:23:08.667+00	2026-10-16 06:23:08.667+00
2	40.77	29.94	5	\N	2	2026-10-16 06:23:08.811+00	2026-10-15 13:31:34.688+00	2026-10-16 06:23:08.864+00	2026-10-16 06:23:08.864+00
3	40.77	29.94	5	\N	2	2026-10-16 06:29:03.99+00	2026-10-15 13:31:34.688+00	2026-10-16 06:29:04.053+00	2026-10-16 06:29:04.053+00
4	40.77	29.94	5	\N	2	2026-10-20 07:18:39.112+00	2026-10-15 13:31:34.688+00	2026-10-20 07:18:39.193+00	2026-10-20 07:18:39.193+00
5	40.77	29.94	31	\N	2	2026-10-21 09:06:13.58+00	2026-10-15 13:31:34.688+00	2026-10-21 09:06:13.614+00	2026-10-21 09:06:13.614+00
6	40.77	29.94	31	\N	2	2026-10-21 09:06:13.706+00	2026-10-15 13:31:34.688+00	2026-10-21 09:06:13.754+00	2026-10-21 09:06:13.754+00
7	41.01	28.97	31	\N	2	2026-10-30 06:55:59.272+00	2026-10-15 13:31:34.688+00	2026-10-30 06:55:59.337+00	2026-10-30 06:55:59.337+00
\.


ALTER TABLE public._home_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_locales DISABLE TRIGGER ALL;

COPY public._home_page_v_locales (version_hero_title, version_hero_subtitle, version_hub_name, version_categories_section_title, version_categories_section_subtitle, version_showcase_title, version_showcase_subtitle, version_gallery_title, version_partners_section_title, version_cta_title, version_cta_button_label, id, _locale, _parent_id, version_featured_section_title, version_featured_section_subtitle, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	1	tr	1	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	2	en	1	\N	\N	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	3	tr	2	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	4	en	2	Featured Products	Highlights	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	5	tr	3	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	6	en	3	Featured Products	Highlights	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	7	tr	4	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	8	en	4	Featured Products	Highlights	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	9	tr	5	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	10	en	5	Featured Products	Highlights	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	11	tr	6	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	12	en	6	Featured Products	Highlights	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	13	tr	7	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	14	en	7	Featured Products	Highlights	\N	\N	\N
\.


ALTER TABLE public._home_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_rels; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_rels DISABLE TRIGGER ALL;

COPY public._home_page_v_rels (id, "order", parent_id, path, media_id) FROM stdin;
1	1	1	version.gallery.images	4
2	2	1	version.gallery.images	2
3	3	1	version.gallery.images	12
4	4	1	version.gallery.images	6
5	5	1	version.gallery.images	3
6	1	2	version.gallery.images	4
7	2	2	version.gallery.images	2
8	3	2	version.gallery.images	12
9	4	2	version.gallery.images	6
10	5	2	version.gallery.images	3
11	1	3	version.gallery.images	4
12	2	3	version.gallery.images	2
13	3	3	version.gallery.images	12
14	4	3	version.gallery.images	6
15	5	3	version.gallery.images	3
16	1	4	version.gallery.images	4
17	2	4	version.gallery.images	2
18	3	4	version.gallery.images	12
19	4	4	version.gallery.images	6
20	5	4	version.gallery.images	3
21	1	5	version.gallery.images	30
22	2	5	version.gallery.images	31
23	3	5	version.gallery.images	32
24	4	5	version.gallery.images	33
25	5	5	version.gallery.images	34
26	6	5	version.gallery.images	35
27	1	6	version.gallery.images	30
28	2	6	version.gallery.images	31
29	3	6	version.gallery.images	32
30	4	6	version.gallery.images	33
31	5	6	version.gallery.images	34
32	6	6	version.gallery.images	35
33	1	7	version.gallery.images	30
34	2	7	version.gallery.images	31
35	3	7	version.gallery.images	32
36	4	7	version.gallery.images	33
37	5	7	version.gallery.images	34
38	6	7	version.gallery.images	35
\.


ALTER TABLE public._home_page_v_rels ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_layout; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_layout DISABLE TRIGGER ALL;

COPY public._home_page_v_version_layout (_order, _parent_id, id, section, visible, _uuid) FROM stdin;
1	4	1	partners	t	6ad715cf113882bbdc526e8b
2	4	2	stats	t	6ad715cf113882bbdc526e8c
3	4	3	categories	t	6ad715cf113882bbdc526e8d
4	4	4	featured	t	6ad715cf113882bbdc526e8e
5	4	5	showcase	t	6ad715cf113882bbdc526e8f
6	4	6	gallery	t	6ad715cf113882bbdc526e90
7	4	7	cta	t	6ad715cf113882bbdc526e91
1	5	8	partners	t	6ad715cf113882bbdc526e8b
2	5	9	stats	t	6ad715cf113882bbdc526e8c
3	5	10	categories	t	6ad715cf113882bbdc526e8d
4	5	11	featured	t	6ad715cf113882bbdc526e8e
5	5	12	showcase	t	6ad715cf113882bbdc526e8f
6	5	13	gallery	t	6ad715cf113882bbdc526e90
7	5	14	cta	t	6ad715cf113882bbdc526e91
1	6	15	partners	t	6ad715cf113882bbdc526e8b
2	6	16	stats	t	6ad715cf113882bbdc526e8c
3	6	17	categories	t	6ad715cf113882bbdc526e8d
4	6	18	featured	t	6ad715cf113882bbdc526e8e
5	6	19	showcase	t	6ad715cf113882bbdc526e8f
6	6	20	gallery	t	6ad715cf113882bbdc526e90
7	6	21	cta	t	6ad715cf113882bbdc526e91
1	7	22	partners	t	6ad715cf113882bbdc526e8b
2	7	23	stats	t	6ad715cf113882bbdc526e8c
3	7	24	categories	t	6ad715cf113882bbdc526e8d
4	7	25	featured	t	6ad715cf113882bbdc526e8e
5	7	26	showcase	t	6ad715cf113882bbdc526e8f
6	7	27	gallery	t	6ad715cf113882bbdc526e90
7	7	28	cta	t	6ad715cf113882bbdc526e91
\.


ALTER TABLE public._home_page_v_version_layout ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_routes; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_routes DISABLE TRIGGER ALL;

COPY public._home_page_v_version_routes (_order, _parent_id, id, direction, lat, lng, _uuid) FROM stdin;
1	1	1	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	1	2	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	1	3	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	1	4	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	1	5	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	1	6	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	1	7	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	1	8	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	1	9	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	1	10	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	1	11	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	1	12	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	1	13	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	1	14	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
1	2	15	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	2	16	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	2	17	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	2	18	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	2	19	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	2	20	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	2	21	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	2	22	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	2	23	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	2	24	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	2	25	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	2	26	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	2	27	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	2	28	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
1	3	29	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	3	30	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	3	31	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	3	32	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	3	33	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	3	34	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	3	35	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	3	36	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	3	37	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	3	38	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	3	39	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	3	40	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	3	41	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	3	42	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
1	4	43	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	4	44	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	4	45	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	4	46	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	4	47	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	4	48	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	4	49	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	4	50	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	4	51	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	4	52	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	4	53	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	4	54	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	4	55	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	4	56	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
1	5	57	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	5	58	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	5	59	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	5	60	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	5	61	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	5	62	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	5	63	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	5	64	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	5	65	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	5	66	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	5	67	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	5	68	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	5	69	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	5	70	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
1	6	71	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	6	72	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	6	73	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	6	74	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	6	75	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	6	76	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	6	77	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	6	78	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	6	79	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	6	80	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	6	81	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	6	82	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	6	83	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	6	84	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
1	7	85	import	31.23	121.47	6ad0d5b6750a1f16844a0c0c
2	7	86	import	19.07	72.88	6ad0d5b6750a1f16844a0c0d
3	7	87	import	53.55	9.99	6ad0d5b6750a1f16844a0c0e
4	7	88	import	44.41	8.93	6ad0d5b6750a1f16844a0c0f
5	7	89	import	51.22	4.4	6ad0d5b6750a1f16844a0c10
6	7	90	import	35.18	129.08	6ad0d5b6750a1f16844a0c11
7	7	91	export	40.41	49.87	6ad0d5b6750a1f16844a0c12
8	7	92	export	36.19	44.01	6ad0d5b6750a1f16844a0c13
9	7	93	export	30.04	31.24	6ad0d5b6750a1f16844a0c14
10	7	94	export	36.75	3.06	6ad0d5b6750a1f16844a0c15
11	7	95	export	44.43	26.1	6ad0d5b6750a1f16844a0c16
12	7	96	export	41.3	69.24	6ad0d5b6750a1f16844a0c17
13	7	97	export	24.71	46.68	6ad0d5b6750a1f16844a0c18
14	7	98	export	41.72	44.79	6ad0d5b6750a1f16844a0c19
\.


ALTER TABLE public._home_page_v_version_routes ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_routes_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_routes_locales DISABLE TRIGGER ALL;

COPY public._home_page_v_version_routes_locales (label, id, _locale, _parent_id) FROM stdin;
Şanghay	1	tr	1
Shanghai	2	en	1
Mumbai	3	tr	2
Mumbai	4	en	2
Hamburg	5	tr	3
Hamburg	6	en	3
Cenova	7	tr	4
Genoa	8	en	4
Anvers	9	tr	5
Antwerp	10	en	5
Busan	11	tr	6
Busan	12	en	6
Bakü	13	tr	7
Baku	14	en	7
Erbil	15	tr	8
Erbil	16	en	8
Kahire	17	tr	9
Cairo	18	en	9
Cezayir	19	tr	10
Algiers	20	en	10
Bükreş	21	tr	11
Bucharest	22	en	11
Taşkent	23	tr	12
Tashkent	24	en	12
Riyad	25	tr	13
Riyadh	26	en	13
Tiflis	27	tr	14
Tbilisi	28	en	14
Şanghay	29	tr	15
Shanghai	30	en	15
Mumbai	31	tr	16
Mumbai	32	en	16
Hamburg	33	tr	17
Hamburg	34	en	17
Cenova	35	tr	18
Genoa	36	en	18
Anvers	37	tr	19
Antwerp	38	en	19
Busan	39	tr	20
Busan	40	en	20
Bakü	41	tr	21
Baku	42	en	21
Erbil	43	tr	22
Erbil	44	en	22
Kahire	45	tr	23
Cairo	46	en	23
Cezayir	47	tr	24
Algiers	48	en	24
Bükreş	49	tr	25
Bucharest	50	en	25
Taşkent	51	tr	26
Tashkent	52	en	26
Riyad	53	tr	27
Riyadh	54	en	27
Tiflis	55	tr	28
Tbilisi	56	en	28
Şanghay	57	tr	29
Shanghai	58	en	29
Mumbai	59	tr	30
Mumbai	60	en	30
Hamburg	61	tr	31
Hamburg	62	en	31
Cenova	63	tr	32
Genoa	64	en	32
Anvers	65	tr	33
Antwerp	66	en	33
Busan	67	tr	34
Busan	68	en	34
Bakü	69	tr	35
Baku	70	en	35
Erbil	71	tr	36
Erbil	72	en	36
Kahire	73	tr	37
Cairo	74	en	37
Cezayir	75	tr	38
Algiers	76	en	38
Bükreş	77	tr	39
Bucharest	78	en	39
Taşkent	79	tr	40
Tashkent	80	en	40
Riyad	81	tr	41
Riyadh	82	en	41
Tiflis	83	tr	42
Tbilisi	84	en	42
Şanghay	85	tr	43
Shanghai	86	en	43
Mumbai	87	tr	44
Mumbai	88	en	44
Hamburg	89	tr	45
Hamburg	90	en	45
Cenova	91	tr	46
Genoa	92	en	46
Anvers	93	tr	47
Antwerp	94	en	47
Busan	95	tr	48
Busan	96	en	48
Bakü	97	tr	49
Baku	98	en	49
Erbil	99	tr	50
Erbil	100	en	50
Kahire	101	tr	51
Cairo	102	en	51
Cezayir	103	tr	52
Algiers	104	en	52
Bükreş	105	tr	53
Bucharest	106	en	53
Taşkent	107	tr	54
Tashkent	108	en	54
Riyad	109	tr	55
Riyadh	110	en	55
Tiflis	111	tr	56
Tbilisi	112	en	56
Şanghay	113	tr	57
Shanghai	114	en	57
Mumbai	115	tr	58
Mumbai	116	en	58
Hamburg	117	tr	59
Hamburg	118	en	59
Cenova	119	tr	60
Genoa	120	en	60
Anvers	121	tr	61
Antwerp	122	en	61
Busan	123	tr	62
Busan	124	en	62
Bakü	125	tr	63
Baku	126	en	63
Erbil	127	tr	64
Erbil	128	en	64
Kahire	129	tr	65
Cairo	130	en	65
Cezayir	131	tr	66
Algiers	132	en	66
Bükreş	133	tr	67
Bucharest	134	en	67
Taşkent	135	tr	68
Tashkent	136	en	68
Riyad	137	tr	69
Riyadh	138	en	69
Tiflis	139	tr	70
Tbilisi	140	en	70
Şanghay	141	tr	71
Shanghai	142	en	71
Mumbai	143	tr	72
Mumbai	144	en	72
Hamburg	145	tr	73
Hamburg	146	en	73
Cenova	147	tr	74
Genoa	148	en	74
Anvers	149	tr	75
Antwerp	150	en	75
Busan	151	tr	76
Busan	152	en	76
Bakü	153	tr	77
Baku	154	en	77
Erbil	155	tr	78
Erbil	156	en	78
Kahire	157	tr	79
Cairo	158	en	79
Cezayir	159	tr	80
Algiers	160	en	80
Bükreş	161	tr	81
Bucharest	162	en	81
Taşkent	163	tr	82
Tashkent	164	en	82
Riyad	165	tr	83
Riyadh	166	en	83
Tiflis	167	tr	84
Tbilisi	168	en	84
Şanghay	169	tr	85
Shanghai	170	en	85
Mumbai	171	tr	86
Mumbai	172	en	86
Hamburg	173	tr	87
Hamburg	174	en	87
Cenova	175	tr	88
Genoa	176	en	88
Anvers	177	tr	89
Antwerp	178	en	89
Busan	179	tr	90
Busan	180	en	90
Bakü	181	tr	91
Baku	182	en	91
Erbil	183	tr	92
Erbil	184	en	92
Kahire	185	tr	93
Cairo	186	en	93
Cezayir	187	tr	94
Algiers	188	en	94
Bükreş	189	tr	95
Bucharest	190	en	95
Taşkent	191	tr	96
Tashkent	192	en	96
Riyad	193	tr	97
Riyadh	194	en	97
Tiflis	195	tr	98
Tbilisi	196	en	98
\.


ALTER TABLE public._home_page_v_version_routes_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_slides; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_slides DISABLE TRIGGER ALL;

COPY public._home_page_v_version_slides (_order, _parent_id, id, image_id, video_id, _uuid) FROM stdin;
1	1	1	1	\N	6ad0d5b6750a1f16844a0c09
2	1	2	3	\N	6ad0d5b6750a1f16844a0c0a
3	1	3	4	\N	6ad0d5b6750a1f16844a0c0b
1	2	4	1	\N	6ad0d5b6750a1f16844a0c09
2	2	5	3	\N	6ad0d5b6750a1f16844a0c0a
3	2	6	4	\N	6ad0d5b6750a1f16844a0c0b
1	3	7	1	\N	6ad0d5b6750a1f16844a0c09
2	3	8	3	\N	6ad0d5b6750a1f16844a0c0a
3	3	9	4	\N	6ad0d5b6750a1f16844a0c0b
1	4	10	1	\N	6ad0d5b6750a1f16844a0c09
2	4	11	3	\N	6ad0d5b6750a1f16844a0c0a
3	4	12	4	\N	6ad0d5b6750a1f16844a0c0b
1	5	13	30	\N	6ad88085659e0c998c1d3dfe
2	5	14	1	\N	6ad0d5b6750a1f16844a0c09
3	5	15	3	\N	6ad0d5b6750a1f16844a0c0a
4	5	16	4	\N	6ad0d5b6750a1f16844a0c0b
1	6	17	30	\N	6ad88085659e0c998c1d3dfe
2	6	18	1	\N	6ad0d5b6750a1f16844a0c09
3	6	19	3	\N	6ad0d5b6750a1f16844a0c0a
4	6	20	4	\N	6ad0d5b6750a1f16844a0c0b
1	7	21	30	\N	6ad88085659e0c998c1d3dfe
2	7	22	1	\N	6ad0d5b6750a1f16844a0c09
3	7	23	3	\N	6ad0d5b6750a1f16844a0c0a
4	7	24	4	\N	6ad0d5b6750a1f16844a0c0b
\.


ALTER TABLE public._home_page_v_version_slides ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_slides_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_slides_locales DISABLE TRIGGER ALL;

COPY public._home_page_v_version_slides_locales (caption, id, _locale, _parent_id) FROM stdin;
İthalat · İhracat	1	tr	1
Import · Export	2	en	1
Küresel lojistik	3	tr	2
Global logistics	4	en	2
Stoktan hızlı tedarik	5	tr	3
Fast supply from stock	6	en	3
İthalat · İhracat	7	tr	4
Import · Export	8	en	4
Küresel lojistik	9	tr	5
Global logistics	10	en	5
Stoktan hızlı tedarik	11	tr	6
Fast supply from stock	12	en	6
İthalat · İhracat	13	tr	7
Import · Export	14	en	7
Küresel lojistik	15	tr	8
Global logistics	16	en	8
Stoktan hızlı tedarik	17	tr	9
Fast supply from stock	18	en	9
İthalat · İhracat	19	tr	10
Import · Export	20	en	10
Küresel lojistik	21	tr	11
Global logistics	22	en	11
Stoktan hızlı tedarik	23	tr	12
Fast supply from stock	24	en	12
Çatalca Depomuz	25	tr	13
İthalat · İhracat	26	tr	14
Import · Export	27	en	14
Küresel lojistik	28	tr	15
Global logistics	29	en	15
Stoktan hızlı tedarik	30	tr	16
Fast supply from stock	31	en	16
Çatalca Depomuz	32	tr	17
Our Çatalca warehouse	33	en	17
İthalat · İhracat	34	tr	18
Import · Export	35	en	18
Küresel lojistik	36	tr	19
Global logistics	37	en	19
Stoktan hızlı tedarik	38	tr	20
Fast supply from stock	39	en	20
Çatalca Depomuz	40	tr	21
Our Çatalca warehouse	41	en	21
İthalat · İhracat	42	tr	22
Import · Export	43	en	22
Küresel lojistik	44	tr	23
Global logistics	45	en	23
Stoktan hızlı tedarik	46	tr	24
Fast supply from stock	47	en	24
\.


ALTER TABLE public._home_page_v_version_slides_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_stats; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_stats DISABLE TRIGGER ALL;

COPY public._home_page_v_version_stats (_order, _parent_id, id, value, suffix, _uuid) FROM stdin;
1	1	1	30	+	6ad0d5b6750a1f16844a0c1a
2	1	2	500	+	6ad0d5b6750a1f16844a0c1b
3	1	3	25		6ad0d5b6750a1f16844a0c1c
4	1	4	12000	 t	6ad0d5b6750a1f16844a0c1d
1	2	5	30	+	6ad0d5b6750a1f16844a0c1a
2	2	6	500	+	6ad0d5b6750a1f16844a0c1b
3	2	7	25		6ad0d5b6750a1f16844a0c1c
4	2	8	12000	 t	6ad0d5b6750a1f16844a0c1d
1	3	9	30	+	6ad0d5b6750a1f16844a0c1a
2	3	10	500	+	6ad0d5b6750a1f16844a0c1b
3	3	11	12000	 t	6ad0d5b6750a1f16844a0c1d
1	4	12	30	+	6ad0d5b6750a1f16844a0c1a
2	4	13	500	+	6ad0d5b6750a1f16844a0c1b
3	4	14	12000	 t	6ad0d5b6750a1f16844a0c1d
1	5	15	30	+	6ad0d5b6750a1f16844a0c1a
2	5	16	500	+	6ad0d5b6750a1f16844a0c1b
3	5	17	12000	 t	6ad0d5b6750a1f16844a0c1d
1	6	18	30	+	6ad0d5b6750a1f16844a0c1a
2	6	19	500	+	6ad0d5b6750a1f16844a0c1b
3	6	20	12000	 t	6ad0d5b6750a1f16844a0c1d
1	7	21	30	+	6ad0d5b6750a1f16844a0c1a
2	7	22	500	+	6ad0d5b6750a1f16844a0c1b
3	7	23	12000	 t	6ad0d5b6750a1f16844a0c1d
\.


ALTER TABLE public._home_page_v_version_stats ENABLE TRIGGER ALL;

--
-- Data for Name: _home_page_v_version_stats_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._home_page_v_version_stats_locales DISABLE TRIGGER ALL;

COPY public._home_page_v_version_stats_locales (label, id, _locale, _parent_id) FROM stdin;
Ülke	1	tr	1
Countries	2	en	1
Ürün	3	tr	2
Products	4	en	2
Yıllık tecrübe	5	tr	3
Years of experience	6	en	3
Yıllık tedarik	7	tr	4
Annual supply	8	en	4
Ülke	9	tr	5
Countries	10	en	5
Ürün	11	tr	6
Products	12	en	6
Yıllık tecrübe	13	tr	7
Years of experience	14	en	7
Yıllık tedarik	15	tr	8
Annual supply	16	en	8
Ülke	17	tr	9
Countries	18	en	9
Ürün	19	tr	10
Products	20	en	10
Yıllık tedarik	21	tr	11
Annual supply	22	en	11
Ülke	23	tr	12
Countries	24	en	12
Ürün	25	tr	13
Products	26	en	13
Yıllık tedarik	27	tr	14
Annual supply	28	en	14
Ülke	29	tr	15
Countries	30	en	15
Ürün	31	tr	16
Products	32	en	16
Yıllık tedarik	33	tr	17
Annual supply	34	en	17
Ülke	35	tr	18
Countries	36	en	18
Ürün	37	tr	19
Products	38	en	19
Yıllık tedarik	39	tr	20
Annual supply	40	en	20
Ülke	41	tr	21
Countries	42	en	21
Ürün	43	tr	22
Products	44	en	22
Yıllık tedarik	45	tr	23
Annual supply	46	en	23
\.


ALTER TABLE public._home_page_v_version_stats_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _partners_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._partners_page_v DISABLE TRIGGER ALL;

COPY public._partners_page_v (id, version_hero_image_id, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
\.


ALTER TABLE public._partners_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _partners_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._partners_page_v_locales DISABLE TRIGGER ALL;

COPY public._partners_page_v_locales (version_hero_title, version_hero_subtitle, id, _locale, _parent_id, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
\.


ALTER TABLE public._partners_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.partners DISABLE TRIGGER ALL;

COPY public.partners (id, name, logo_id, relation, website, "order", updated_at, created_at, image_id, logo_plate, grayscale) FROM stdin;
1	Nordic Metals	18	supplier	\N	0	2026-10-16 07:24:51.981+00	2026-10-15 13:31:34.123+00	9	light	t
2	Rhein Chemie Handel	19	supplier	\N	1	2026-10-16 07:24:52.103+00	2026-10-15 13:31:34.151+00	8	light	t
3	Shanghai Plating Materials	20	supplier	\N	2	2026-10-16 07:24:52.22+00	2026-10-15 13:31:34.175+00	1	light	t
4	Mumbai Salts Ltd.	21	supplier	\N	3	2026-10-16 07:24:52.354+00	2026-10-15 13:31:34.207+00	13	light	t
5	Liguria Chimica	22	supplier	\N	4	2026-10-16 07:24:52.461+00	2026-10-15 13:31:34.242+00	12	light	t
6	Busan Zinc Co.	23	supplier	\N	5	2026-10-16 07:24:52.584+00	2026-10-15 13:31:34.269+00	3	dark	t
7	Anadolu Kaplama	24	customer	\N	6	2026-10-16 07:24:52.703+00	2026-10-15 13:31:34.296+00	\N	light	t
8	Marmara Galvaniz	25	customer	\N	7	2026-10-16 07:24:52.816+00	2026-10-15 13:31:34.323+00	\N	light	t
9	Bakü Metal Coating	26	customer	\N	8	2026-10-16 07:24:52.926+00	2026-10-15 13:31:34.347+00	\N	light	t
10	Erbil Surface Tech	27	customer	\N	9	2026-10-16 07:24:53.043+00	2026-10-15 13:31:34.37+00	\N	light	t
11	Cairo Electroplating	28	customer	\N	10	2026-10-16 07:24:53.171+00	2026-10-15 13:31:34.394+00	\N	light	t
12	Tashkent Coating	29	customer	\N	11	2026-10-16 07:24:53.282+00	2026-10-15 13:31:34.418+00	\N	light	t
\.


ALTER TABLE public.partners ENABLE TRIGGER ALL;

--
-- Data for Name: _partners_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._partners_v DISABLE TRIGGER ALL;

COPY public._partners_v (id, parent_id, version_name, version_logo_id, version_relation, version_website, version_order, version_updated_at, version_created_at, created_at, updated_at, version_image_id, version_logo_plate, version_grayscale) FROM stdin;
1	1	Nordic Metals	18	supplier	\N	0	2026-10-16 07:24:51.981+00	2026-10-15 13:31:34.123+00	2026-10-16 07:24:51.994+00	2026-10-16 07:24:51.994+00	9	light	t
2	2	Rhein Chemie Handel	19	supplier	\N	1	2026-10-16 07:24:52.103+00	2026-10-15 13:31:34.151+00	2026-10-16 07:24:52.11+00	2026-10-16 07:24:52.11+00	8	light	t
3	3	Shanghai Plating Materials	20	supplier	\N	2	2026-10-16 07:24:52.22+00	2026-10-15 13:31:34.175+00	2026-10-16 07:24:52.228+00	2026-10-16 07:24:52.228+00	1	light	t
4	4	Mumbai Salts Ltd.	21	supplier	\N	3	2026-10-16 07:24:52.354+00	2026-10-15 13:31:34.207+00	2026-10-16 07:24:52.362+00	2026-10-16 07:24:52.362+00	13	light	t
5	5	Liguria Chimica	22	supplier	\N	4	2026-10-16 07:24:52.461+00	2026-10-15 13:31:34.242+00	2026-10-16 07:24:52.468+00	2026-10-16 07:24:52.468+00	12	light	t
6	6	Busan Zinc Co.	23	supplier	\N	5	2026-10-16 07:24:52.584+00	2026-10-15 13:31:34.269+00	2026-10-16 07:24:52.594+00	2026-10-16 07:24:52.594+00	3	dark	t
7	7	Anadolu Kaplama	24	customer	\N	6	2026-10-16 07:24:52.703+00	2026-10-15 13:31:34.296+00	2026-10-16 07:24:52.711+00	2026-10-16 07:24:52.711+00	\N	light	t
8	8	Marmara Galvaniz	25	customer	\N	7	2026-10-16 07:24:52.816+00	2026-10-15 13:31:34.323+00	2026-10-16 07:24:52.825+00	2026-10-16 07:24:52.825+00	\N	light	t
9	9	Bakü Metal Coating	26	customer	\N	8	2026-10-16 07:24:52.926+00	2026-10-15 13:31:34.347+00	2026-10-16 07:24:52.934+00	2026-10-16 07:24:52.934+00	\N	light	t
10	10	Erbil Surface Tech	27	customer	\N	9	2026-10-16 07:24:53.043+00	2026-10-15 13:31:34.37+00	2026-10-16 07:24:53.054+00	2026-10-16 07:24:53.054+00	\N	light	t
11	11	Cairo Electroplating	28	customer	\N	10	2026-10-16 07:24:53.171+00	2026-10-15 13:31:34.394+00	2026-10-16 07:24:53.183+00	2026-10-16 07:24:53.183+00	\N	light	t
12	12	Tashkent Coating	29	customer	\N	11	2026-10-16 07:24:53.282+00	2026-10-15 13:31:34.418+00	2026-10-16 07:24:53.291+00	2026-10-16 07:24:53.291+00	\N	light	t
\.


ALTER TABLE public._partners_v ENABLE TRIGGER ALL;

--
-- Data for Name: _partners_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._partners_v_locales DISABLE TRIGGER ALL;

COPY public._partners_v_locales (version_country, id, _locale, _parent_id) FROM stdin;
Finlandiya	1	tr	1
Finland	2	en	1
Almanya	3	tr	2
Germany	4	en	2
Çin	5	tr	3
China	6	en	3
Hindistan	7	tr	4
India	8	en	4
İtalya	9	tr	5
Italy	10	en	5
Güney Kore	11	tr	6
South Korea	12	en	6
Türkiye	13	tr	7
Türkiye	14	en	7
Türkiye	15	tr	8
Türkiye	16	en	8
Azerbaycan	17	tr	9
Azerbaijan	18	en	9
Irak	19	tr	10
Iraq	20	en	10
Mısır	21	tr	11
Egypt	22	en	11
Özbekistan	23	tr	12
Uzbekistan	24	en	12
\.


ALTER TABLE public._partners_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _privacy_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._privacy_page_v DISABLE TRIGGER ALL;

COPY public._privacy_page_v (id, version_last_updated, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
1	2026-10-16 06:23:07.982+00	2026-10-16 06:23:08.412+00	2026-10-16 06:23:08.413+00	2026-10-16 06:23:08.432+00	2026-10-16 06:23:08.432+00
2	2026-10-16 06:23:07.982+00	2026-10-16 06:23:08.472+00	2026-10-16 06:23:08.413+00	2026-10-16 06:23:08.491+00	2026-10-16 06:23:08.491+00
\.


ALTER TABLE public._privacy_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _privacy_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._privacy_page_v_locales DISABLE TRIGGER ALL;

COPY public._privacy_page_v_locales (version_title, version_content, id, _locale, _parent_id, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
KVKK Aydınlatma Metni ve Gizlilik Politikası	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bu metin örnek bir şablondur. Yayından önce hukuk danışmanınızın onayladığı metinle değiştirin.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Veri Sorumlusu", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "6698 sayılı Kişisel Verilerin Korunması Kanunu (\\"KVKK\\") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla Güven Galvano Kimyasalları tarafından aşağıda açıklanan kapsamda işlenmektedir.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşlenen Kişisel Veriler", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Kimlik ve iletişim bilgileri: ad soyad, firma adı, e-posta, telefon, ülke/şehir", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Talep bilgileri: teklif sepetindeki ürünler, miktarlar ve mesajınız", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşlem güvenliği bilgileri: IP adresi ve istek zamanı", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşleme Amaçları ve Hukuki Sebep", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Verileriniz; teklif ve iletişim taleplerinize yanıt verilmesi, ticari ilişkinin kurulması ve kötüye kullanımın önlenmesi amaçlarıyla, KVKK m.5/2 (c) ve (f) bentlerine dayanılarak işlenir. Talepler web sitesinde saklanmaz; yalnızca yetkili satış ekibine e-posta ile iletilir.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aktarım", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Verileriniz, e-posta hizmet sağlayıcıları ve yasal yükümlülükler kapsamında yetkili kamu kurumları dışında üçüncü kişilere aktarılmaz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Haklarınız", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "KVKK m.11 kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Başvurularınızı İletişim sayfasındaki adreslere iletebilirsiniz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	1	tr	1	\N	\N	\N
KVKK Aydınlatma Metni ve Gizlilik Politikası	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bu metin örnek bir şablondur. Yayından önce hukuk danışmanınızın onayladığı metinle değiştirin.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Veri Sorumlusu", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "6698 sayılı Kişisel Verilerin Korunması Kanunu (\\"KVKK\\") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla Güven Galvano Kimyasalları tarafından aşağıda açıklanan kapsamda işlenmektedir.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşlenen Kişisel Veriler", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Kimlik ve iletişim bilgileri: ad soyad, firma adı, e-posta, telefon, ülke/şehir", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Talep bilgileri: teklif sepetindeki ürünler, miktarlar ve mesajınız", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşlem güvenliği bilgileri: IP adresi ve istek zamanı", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşleme Amaçları ve Hukuki Sebep", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Verileriniz; teklif ve iletişim taleplerinize yanıt verilmesi, ticari ilişkinin kurulması ve kötüye kullanımın önlenmesi amaçlarıyla, KVKK m.5/2 (c) ve (f) bentlerine dayanılarak işlenir. Talepler web sitesinde saklanmaz; yalnızca yetkili satış ekibine e-posta ile iletilir.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aktarım", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Verileriniz, e-posta hizmet sağlayıcıları ve yasal yükümlülükler kapsamında yetkili kamu kurumları dışında üçüncü kişilere aktarılmaz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Haklarınız", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "KVKK m.11 kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Başvurularınızı İletişim sayfasındaki adreslere iletebilirsiniz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	2	tr	2	\N	\N	\N
Privacy Notice	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This is a sample template. Replace it with the text approved by your legal advisor before going live.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Data Controller", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Under the Turkish Personal Data Protection Law No. 6698 (\\"KVKK\\"), your personal data is processed by Güven Galvano Kimyasalları as data controller, as described below.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Data We Process", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Identity and contact details: name, company, e-mail, phone, country/city", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Request details: products and quantities in your quote basket and your message", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Security data: IP address and request time", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Purposes and Legal Basis", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Your data is processed to respond to your quote and contact requests, to establish a business relationship and to prevent abuse. Requests are not stored on the website; they are only e-mailed to our authorised sales team.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Transfers", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Your data is not shared with third parties other than e-mail service providers and competent authorities where legally required.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Your Rights", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Under Article 11 of KVKK you may ask whether your data is processed, request its correction or deletion, and object to processing. Please use the addresses on our Contact page.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	3	en	2	\N	\N	\N
\.


ALTER TABLE public._privacy_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: processes; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.processes DISABLE TRIGGER ALL;

COPY public.processes (id, slug, "order", updated_at, created_at) FROM stdin;
1	akimsiz-nikel	0	2026-10-16 06:39:27.729+00	2026-10-16 06:39:27.61+00
2	altin-kaplama	1	2026-10-16 06:39:27.814+00	2026-10-16 06:39:27.785+00
3	bakir-kaplama	2	2026-10-16 06:39:27.867+00	2026-10-16 06:39:27.842+00
4	cinko-kaplama	3	2026-10-16 06:39:27.92+00	2026-10-16 06:39:27.898+00
5	cinko-demir-kaplama	4	2026-10-16 06:39:27.97+00	2026-10-16 06:39:27.947+00
6	fosfat-kaplama	5	2026-10-16 06:39:28.02+00	2026-10-16 06:39:27.999+00
7	kalay-kaplama	6	2026-10-16 06:39:28.07+00	2026-10-16 06:39:28.049+00
8	krom-kaplama	7	2026-10-16 06:39:28.121+00	2026-10-16 06:39:28.1+00
9	lak-sokuculer	8	2026-10-16 06:39:28.185+00	2026-10-16 06:39:28.148+00
10	nikel-kaplama	9	2026-10-16 06:39:28.257+00	2026-10-16 06:39:28.22+00
11	pasivasyon	10	2026-10-16 06:39:28.311+00	2026-10-16 06:39:28.28+00
12	pirinc-dekoratif	11	2026-10-16 06:39:28.378+00	2026-10-16 06:39:28.343+00
13	yag-alma-on-islem	12	2026-10-16 06:39:28.445+00	2026-10-16 06:39:28.412+00
\.


ALTER TABLE public.processes ENABLE TRIGGER ALL;

--
-- Data for Name: _processes_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._processes_v DISABLE TRIGGER ALL;

COPY public._processes_v (id, parent_id, version_slug, version_order, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
1	1	akimsiz-nikel	0	2026-10-16 06:39:27.615+00	2026-10-16 06:39:27.61+00	2026-10-16 06:39:27.641+00	2026-10-16 06:39:27.641+00
2	1	akimsiz-nikel	0	2026-10-16 06:39:27.729+00	2026-10-16 06:39:27.61+00	2026-10-16 06:39:27.747+00	2026-10-16 06:39:27.747+00
3	2	altin-kaplama	1	2026-10-16 06:39:27.786+00	2026-10-16 06:39:27.785+00	2026-10-16 06:39:27.793+00	2026-10-16 06:39:27.793+00
4	2	altin-kaplama	1	2026-10-16 06:39:27.814+00	2026-10-16 06:39:27.785+00	2026-10-16 06:39:27.823+00	2026-10-16 06:39:27.823+00
5	3	bakir-kaplama	2	2026-10-16 06:39:27.842+00	2026-10-16 06:39:27.842+00	2026-10-16 06:39:27.847+00	2026-10-16 06:39:27.847+00
6	3	bakir-kaplama	2	2026-10-16 06:39:27.867+00	2026-10-16 06:39:27.842+00	2026-10-16 06:39:27.882+00	2026-10-16 06:39:27.882+00
7	4	cinko-kaplama	3	2026-10-16 06:39:27.899+00	2026-10-16 06:39:27.898+00	2026-10-16 06:39:27.903+00	2026-10-16 06:39:27.903+00
8	4	cinko-kaplama	3	2026-10-16 06:39:27.92+00	2026-10-16 06:39:27.898+00	2026-10-16 06:39:27.927+00	2026-10-16 06:39:27.927+00
9	5	cinko-demir-kaplama	4	2026-10-16 06:39:27.947+00	2026-10-16 06:39:27.947+00	2026-10-16 06:39:27.952+00	2026-10-16 06:39:27.952+00
10	5	cinko-demir-kaplama	4	2026-10-16 06:39:27.97+00	2026-10-16 06:39:27.947+00	2026-10-16 06:39:27.977+00	2026-10-16 06:39:27.977+00
11	6	fosfat-kaplama	5	2026-10-16 06:39:27.999+00	2026-10-16 06:39:27.999+00	2026-10-16 06:39:28.005+00	2026-10-16 06:39:28.005+00
12	6	fosfat-kaplama	5	2026-10-16 06:39:28.02+00	2026-10-16 06:39:27.999+00	2026-10-16 06:39:28.027+00	2026-10-16 06:39:28.027+00
13	7	kalay-kaplama	6	2026-10-16 06:39:28.049+00	2026-10-16 06:39:28.049+00	2026-10-16 06:39:28.054+00	2026-10-16 06:39:28.054+00
14	7	kalay-kaplama	6	2026-10-16 06:39:28.07+00	2026-10-16 06:39:28.049+00	2026-10-16 06:39:28.079+00	2026-10-16 06:39:28.079+00
15	8	krom-kaplama	7	2026-10-16 06:39:28.1+00	2026-10-16 06:39:28.1+00	2026-10-16 06:39:28.106+00	2026-10-16 06:39:28.106+00
16	8	krom-kaplama	7	2026-10-16 06:39:28.121+00	2026-10-16 06:39:28.1+00	2026-10-16 06:39:28.128+00	2026-10-16 06:39:28.128+00
17	9	lak-sokuculer	8	2026-10-16 06:39:28.148+00	2026-10-16 06:39:28.148+00	2026-10-16 06:39:28.16+00	2026-10-16 06:39:28.16+00
18	9	lak-sokuculer	8	2026-10-16 06:39:28.185+00	2026-10-16 06:39:28.148+00	2026-10-16 06:39:28.198+00	2026-10-16 06:39:28.198+00
19	10	nikel-kaplama	9	2026-10-16 06:39:28.221+00	2026-10-16 06:39:28.22+00	2026-10-16 06:39:28.228+00	2026-10-16 06:39:28.228+00
20	10	nikel-kaplama	9	2026-10-16 06:39:28.257+00	2026-10-16 06:39:28.22+00	2026-10-16 06:39:28.264+00	2026-10-16 06:39:28.264+00
21	11	pasivasyon	10	2026-10-16 06:39:28.28+00	2026-10-16 06:39:28.28+00	2026-10-16 06:39:28.29+00	2026-10-16 06:39:28.29+00
22	11	pasivasyon	10	2026-10-16 06:39:28.311+00	2026-10-16 06:39:28.28+00	2026-10-16 06:39:28.322+00	2026-10-16 06:39:28.322+00
23	12	pirinc-dekoratif	11	2026-10-16 06:39:28.343+00	2026-10-16 06:39:28.343+00	2026-10-16 06:39:28.351+00	2026-10-16 06:39:28.351+00
24	12	pirinc-dekoratif	11	2026-10-16 06:39:28.378+00	2026-10-16 06:39:28.343+00	2026-10-16 06:39:28.391+00	2026-10-16 06:39:28.391+00
25	13	yag-alma-on-islem	12	2026-10-16 06:39:28.412+00	2026-10-16 06:39:28.412+00	2026-10-16 06:39:28.42+00	2026-10-16 06:39:28.42+00
26	13	yag-alma-on-islem	12	2026-10-16 06:39:28.445+00	2026-10-16 06:39:28.412+00	2026-10-16 06:39:28.457+00	2026-10-16 06:39:28.457+00
\.


ALTER TABLE public._processes_v ENABLE TRIGGER ALL;

--
-- Data for Name: _processes_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._processes_v_locales DISABLE TRIGGER ALL;

COPY public._processes_v_locales (version_name, id, _locale, _parent_id) FROM stdin;
Akımsız Nikel	1	tr	1
Akımsız Nikel	2	tr	2
Electroless Nickel	3	en	2
Altın Kaplama	4	tr	3
Altın Kaplama	5	tr	4
Gold Plating	6	en	4
Bakır Kaplama	7	tr	5
Bakır Kaplama	8	tr	6
Copper Plating	9	en	6
Çinko Kaplama	10	tr	7
Çinko Kaplama	11	tr	8
Zinc Plating	12	en	8
Çinko-Demir Kaplama	13	tr	9
Çinko-Demir Kaplama	14	tr	10
Zinc-Iron Plating	15	en	10
Fosfat Kaplama	16	tr	11
Fosfat Kaplama	17	tr	12
Phosphating	18	en	12
Kalay Kaplama	19	tr	13
Kalay Kaplama	20	tr	14
Tin Plating	21	en	14
Krom Kaplama	22	tr	15
Krom Kaplama	23	tr	16
Chrome Plating	24	en	16
Lak & Sökücüler	25	tr	17
Lak & Sökücüler	26	tr	18
Lacquers & Strippers	27	en	18
Nikel Kaplama	28	tr	19
Nikel Kaplama	29	tr	20
Nickel Plating	30	en	20
Pasivasyon	31	tr	21
Pasivasyon	32	tr	22
Passivation	33	en	22
Pirinç & Dekoratif	34	tr	23
Pirinç & Dekoratif	35	tr	24
Brass & Decorative	36	en	24
Yağ Alma & Ön İşlem	37	tr	25
Yağ Alma & Ön İşlem	38	tr	26
Degreasing & Pre-treatment	39	en	26
\.


ALTER TABLE public._processes_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _processes_v_texts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._processes_v_texts DISABLE TRIGGER ALL;

COPY public._processes_v_texts (id, "order", parent_id, path, text) FROM stdin;
\.


ALTER TABLE public._processes_v_texts ENABLE TRIGGER ALL;

--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.product_categories DISABLE TRIGGER ALL;

COPY public.product_categories (id, slug, image_id, "order", updated_at, created_at) FROM stdin;
3	anot-malzemeleri	11	2	2026-10-16 06:39:29.879+00	2026-10-15 13:31:32.875+00
4	parlatici-katkilar	14	3	2026-10-16 06:39:29.946+00	2026-10-15 13:31:32.914+00
1	metal-tuzlari	35	0	2026-10-21 09:06:13.324+00	2026-10-15 13:31:32.79+00
2	asitler-bazlar	33	1	2026-10-21 09:06:13.369+00	2026-10-15 13:31:32.836+00
5	pasivasyon	34	4	2026-10-21 09:06:13.427+00	2026-10-15 13:31:32.956+00
6	dokme-ibc-tedarik	32	5	2026-10-21 09:06:13.479+00	2026-10-15 13:31:32.994+00
\.


ALTER TABLE public.product_categories ENABLE TRIGGER ALL;

--
-- Data for Name: _product_categories_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._product_categories_v DISABLE TRIGGER ALL;

COPY public._product_categories_v (id, parent_id, version_slug, version_image_id, version_order, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
1	1	metal-tuzlari	9	0	2026-10-16 06:39:29.729+00	2026-10-15 13:31:32.79+00	2026-10-16 06:39:29.74+00	2026-10-16 06:39:29.74+00
2	1	metal-tuzlari	9	0	2026-10-16 06:39:29.767+00	2026-10-15 13:31:32.79+00	2026-10-16 06:39:29.773+00	2026-10-16 06:39:29.773+00
3	2	asitler-bazlar	8	1	2026-10-16 06:39:29.793+00	2026-10-15 13:31:32.836+00	2026-10-16 06:39:29.803+00	2026-10-16 06:39:29.803+00
4	2	asitler-bazlar	8	1	2026-10-16 06:39:29.827+00	2026-10-15 13:31:32.836+00	2026-10-16 06:39:29.833+00	2026-10-16 06:39:29.833+00
5	3	anot-malzemeleri	11	2	2026-10-16 06:39:29.852+00	2026-10-15 13:31:32.875+00	2026-10-16 06:39:29.858+00	2026-10-16 06:39:29.858+00
6	3	anot-malzemeleri	11	2	2026-10-16 06:39:29.879+00	2026-10-15 13:31:32.875+00	2026-10-16 06:39:29.89+00	2026-10-16 06:39:29.89+00
7	4	parlatici-katkilar	14	3	2026-10-16 06:39:29.914+00	2026-10-15 13:31:32.914+00	2026-10-16 06:39:29.922+00	2026-10-16 06:39:29.922+00
8	4	parlatici-katkilar	14	3	2026-10-16 06:39:29.946+00	2026-10-15 13:31:32.914+00	2026-10-16 06:39:29.952+00	2026-10-16 06:39:29.952+00
9	5	pasivasyon	10	4	2026-10-16 06:39:29.98+00	2026-10-15 13:31:32.956+00	2026-10-16 06:39:29.989+00	2026-10-16 06:39:29.989+00
10	5	pasivasyon	10	4	2026-10-16 06:39:30.023+00	2026-10-15 13:31:32.956+00	2026-10-16 06:39:30.034+00	2026-10-16 06:39:30.034+00
11	6	dokme-ibc-tedarik	12	5	2026-10-16 06:39:30.057+00	2026-10-15 13:31:32.994+00	2026-10-16 06:39:30.064+00	2026-10-16 06:39:30.064+00
12	6	dokme-ibc-tedarik	12	5	2026-10-16 06:39:30.092+00	2026-10-15 13:31:32.994+00	2026-10-16 06:39:30.101+00	2026-10-16 06:39:30.101+00
13	1	metal-tuzlari-yeni	9	0	2026-10-16 08:08:03.624+00	2026-10-15 13:31:32.79+00	2026-10-16 08:08:03.655+00	2026-10-16 08:08:03.655+00
14	1	metal-tuzlari	9	0	2026-10-16 08:08:15.141+00	2026-10-15 13:31:32.79+00	2026-10-16 08:08:15.167+00	2026-10-16 08:08:15.167+00
15	1	metal-tuzlari	35	0	2026-10-21 09:06:13.324+00	2026-10-15 13:31:32.79+00	2026-10-21 09:06:13.332+00	2026-10-21 09:06:13.332+00
16	2	asitler-bazlar	33	1	2026-10-21 09:06:13.369+00	2026-10-15 13:31:32.836+00	2026-10-21 09:06:13.38+00	2026-10-21 09:06:13.38+00
17	5	pasivasyon	34	4	2026-10-21 09:06:13.427+00	2026-10-15 13:31:32.956+00	2026-10-21 09:06:13.444+00	2026-10-21 09:06:13.444+00
18	6	dokme-ibc-tedarik	32	5	2026-10-21 09:06:13.479+00	2026-10-15 13:31:32.994+00	2026-10-21 09:06:13.493+00	2026-10-21 09:06:13.493+00
\.


ALTER TABLE public._product_categories_v ENABLE TRIGGER ALL;

--
-- Data for Name: _product_categories_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._product_categories_v_locales DISABLE TRIGGER ALL;

COPY public._product_categories_v_locales (version_name, version_summary, id, _locale, _parent_id, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
Metal Tuzları	Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.	1	tr	1	\N	\N	\N
Metal Salts	Nickel, copper, zinc and tin salts.	2	en	1	\N	\N	\N
Metal Tuzları	Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.	3	tr	2	\N	\N	\N
Metal Salts	Nickel, copper, zinc and cobalt salts — the metal source of plating baths.	4	en	2	\N	\N	\N
Asitler & Bazlar	Banyo hazırlama, pH ayarı, dekapaj ve yağ almada kullanılan asit ve bazlar.	5	tr	3	\N	\N	\N
Acids & Bases	Core acids and bases for process baths.	6	en	3	\N	\N	\N
Asitler & Bazlar	Banyo hazırlama, pH ayarı, dekapaj ve yağ almada kullanılan asit ve bazlar.	7	tr	4	\N	\N	\N
Acids & Bases	Acids and bases for bath make-up, pH control, pickling and degreasing.	8	en	4	\N	\N	\N
Anot Malzemeleri	Akım altında çalışan banyolarda çözülerek metale kaplanan anot çeşitleri.	9	tr	5	\N	\N	\N
Anode Materials	Nickel, copper and zinc anodes.	10	en	5	\N	\N	\N
Anot Malzemeleri	Akım altında çalışan banyolarda çözülerek metale kaplanan anot çeşitleri.	11	tr	6	\N	\N	\N
Anode Materials	Anodes that dissolve in electrolytic baths and deposit onto the part.	12	en	6	\N	\N	\N
Parlatıcı & Katkılar	Banyonun çalışmasını ve kaplama kalitesini destekleyen toz ve sıvı katkılar.	13	tr	7	\N	\N	\N
Brighteners & Additives	Bath additives and auxiliaries.	14	en	7	\N	\N	\N
Parlatıcı & Katkılar	Banyonun çalışmasını ve kaplama kalitesini destekleyen toz ve sıvı katkılar.	15	tr	8	\N	\N	\N
Brighteners & Additives	Powder and liquid additives supporting bath performance and deposit quality.	16	en	8	\N	\N	\N
Pasivasyon	Kaplama sonrası korozyon direnci sağlayan pasivasyon hammaddeleri.	17	tr	9	\N	\N	\N
Passivation	Passivation and post-treatment materials.	18	en	9	\N	\N	\N
Pasivasyon	Kaplama sonrası korozyon direnci sağlayan pasivasyon hammaddeleri.	19	tr	10	\N	\N	\N
Passivation	Raw materials for post-plating passivation and corrosion resistance.	20	en	10	\N	\N	\N
Dökme & IBC Tedarik	Varil, IBC ve tanker ile dökme kimyasal tedariki.	21	tr	11	\N	\N	\N
Bulk & IBC Supply	Drum, IBC and bulk shipments.	22	en	11	\N	\N	\N
Dökme & IBC Tedarik	Varil, IBC ve tanker ile dökme kimyasal tedariki.	23	tr	12	\N	\N	\N
Bulk & IBC Supply	Bulk chemical supply in drums, IBCs and tankers.	24	en	12	\N	\N	\N
Metal Tuzları	Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.	25	tr	13	\N	\N	\N
Metal Salts	Nickel, copper, zinc and cobalt salts — the metal source of plating baths.	26	en	13	\N	\N	\N
Metal Tuzları	Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.	27	tr	14	\N	\N	\N
Metal Salts	Nickel, copper, zinc and cobalt salts — the metal source of plating baths.	28	en	14	\N	\N	\N
Metal Tuzları	Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.	29	tr	15	\N	\N	\N
Metal Salts	Nickel, copper, zinc and cobalt salts — the metal source of plating baths.	30	en	15	\N	\N	\N
Asitler & Bazlar	Banyo hazırlama, pH ayarı, dekapaj ve yağ almada kullanılan asit ve bazlar.	31	tr	16	\N	\N	\N
Acids & Bases	Acids and bases for bath make-up, pH control, pickling and degreasing.	32	en	16	\N	\N	\N
Pasivasyon	Kaplama sonrası korozyon direnci sağlayan pasivasyon hammaddeleri.	33	tr	17	\N	\N	\N
Passivation	Raw materials for post-plating passivation and corrosion resistance.	34	en	17	\N	\N	\N
Dökme & IBC Tedarik	Varil, IBC ve tanker ile dökme kimyasal tedariki.	35	tr	18	\N	\N	\N
Bulk & IBC Supply	Bulk chemical supply in drums, IBCs and tankers.	36	en	18	\N	\N	\N
\.


ALTER TABLE public._product_categories_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _product_categories_v_texts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._product_categories_v_texts DISABLE TRIGGER ALL;

COPY public._product_categories_v_texts (id, "order", parent_id, path, text) FROM stdin;
1	1	13	version.previousSlugs	metal-tuzlari
2	1	14	version.previousSlugs	metal-tuzlari-yeni
\.


ALTER TABLE public._product_categories_v_texts ENABLE TRIGGER ALL;

--
-- Data for Name: _products_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_page_v DISABLE TRIGGER ALL;

COPY public._products_page_v (id, version_hero_image_id, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
1	6	2026-10-16 06:39:30.122+00	2026-10-15 13:31:35.949+00	2026-10-16 06:39:30.132+00	2026-10-16 06:39:30.132+00
2	6	2026-10-16 06:39:30.153+00	2026-10-15 13:31:35.949+00	2026-10-16 06:39:30.159+00	2026-10-16 06:39:30.159+00
\.


ALTER TABLE public._products_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _products_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_page_v_locales DISABLE TRIGGER ALL;

COPY public._products_page_v_locales (version_hero_title, version_hero_subtitle, id, _locale, _parent_id, version_catalog_title, version_catalog_description, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
Ürünlerimiz	Kaplama sektörü için hammaddeler	1	tr	1	Ürün Kataloğu	Tedarik ettiğimiz ürünleri gruplara ve kullanıldıkları proseslere göre listeledik. Teknik belgeler için bize ulaşın.	\N	\N	\N
Products	Raw materials for the plating industry	2	en	1	\N	\N	\N	\N	\N
Ürünlerimiz	Kaplama sektörü için hammaddeler	3	tr	2	Ürün Kataloğu	Tedarik ettiğimiz ürünleri gruplara ve kullanıldıkları proseslere göre listeledik. Teknik belgeler için bize ulaşın.	\N	\N	\N
Products	Raw materials for the plating industry	4	en	2	Product Catalogue	Our products listed by group and by the processes they are used in. Contact us for technical documents.	\N	\N	\N
\.


ALTER TABLE public._products_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products DISABLE TRIGGER ALL;

COPY public.products (id, category_id, code, cover_image_id, unit, slug, is_active, featured, "order", updated_at, created_at, cas, formula) FROM stdin;
2	1	GK-NC-02	9	kg	nikel-klorur	t	f	1	2026-10-16 06:39:28.655+00	2026-10-15 13:31:33.128+00	7791-20-0	NiCl2·6H2O
5	2	GK-BA-05	13	kg	borik-asit	t	t	4	2026-10-16 06:39:28.88+00	2026-10-15 13:31:33.379+00	10043-35-3	H3BO3
6	2	GK-SA-06	8	lt	sulfurik-asit	t	f	5	2026-10-16 06:39:28.962+00	2026-10-15 13:31:33.452+00	7664-93-9	H2SO4
8	3	GK-NA-08	11	kg	nikel-anot	t	t	7	2026-10-16 06:39:29.126+00	2026-10-15 13:31:33.62+00	7440-02-0	Ni
9	3	GK-CA-09	11	kg	fosforlu-bakir-anot	t	f	8	2026-10-16 06:39:29.221+00	2026-10-15 13:31:33.705+00	7440-50-8	Cu-P
10	3	GK-ZA-10	11	ton	cinko-anot	t	f	9	2026-10-16 06:39:29.302+00	2026-10-15 13:31:33.773+00	7440-66-6	Zn
11	4	GK-SS-11	14	kg	sakarin-sodyum	t	f	10	2026-10-16 06:39:29.4+00	2026-10-15 13:31:33.839+00	128-44-9	C7H4NNaO3S
12	5	GK-CR-12	10	kg	krom-iii-klorur	t	f	11	2026-10-16 06:39:29.489+00	2026-10-15 13:31:33.912+00	10060-12-5	CrCl3·6H2O
13	5	GK-CO-13	11	kg	kobalt-sulfat	t	f	12	2026-10-16 06:39:29.569+00	2026-10-15 13:31:33.973+00	10026-24-1	CoSO4·7H2O
1	1	GK-NS-01	9	kg	nikel-sulfat	t	t	0	2026-10-16 08:08:14.94+00	2026-10-15 13:31:33.031+00	10101-97-0	NiSO4·6H2O
3	1	GK-CS-03	40	kg	bakir-sulfat	t	t	2	2026-10-21 09:06:11.413+00	2026-10-15 13:31:33.235+00	7758-99-8	CuSO4·5H2O
4	1	GK-ZC-04	36	kg	cinko-klorur	t	f	3	2026-10-21 09:06:11.535+00	2026-10-15 13:31:33.316+00	7646-85-7	ZnCl2
7	2	GK-CSD-07	44	kg	kostik-soda	t	f	6	2026-10-21 09:06:11.611+00	2026-10-15 13:31:33.53+00	1310-73-2	NaOH
14	6	GK-BLK-14	32	ton	dokme-kimyasal-sevkiyat	t	f	13	2026-10-21 09:06:11.728+00	2026-10-15 13:31:34.043+00	\N	\N
15	1	GK-AK-15	37	kg	amonyum-klorur	t	f	14	2026-10-21 09:06:11.873+00	2026-10-21 09:06:11.811+00	12125-02-9	NH4Cl
16	1	GK-BK-16	38	kg	baryum-klorur-dihidrat	t	f	15	2026-10-21 09:06:11.984+00	2026-10-21 09:06:11.933+00	10326-27-9	BaCl2·2H2O
17	4	GK-SN-17	39	kg	sodyum-nitrat	t	f	16	2026-10-21 09:06:12.094+00	2026-10-21 09:06:12.046+00	7631-99-4	NaNO3
18	1	GK-NCN-18	41	kg	sodyum-siyanur	t	f	17	2026-10-21 09:06:12.248+00	2026-10-21 09:06:12.174+00	143-33-9	NaCN
19	1	GK-KCN-19	50	kg	potasyum-siyanur	t	f	18	2026-10-21 09:06:12.368+00	2026-10-21 09:06:12.319+00	151-50-8	KCN
20	2	GK-CRO-20	45	kg	kromik-asit-krom-trioksit	t	f	19	2026-10-21 09:06:12.642+00	2026-10-21 09:06:12.515+00	1333-82-0	CrO3
21	2	GK-KOH-21	48	kg	potasyum-hidroksit	t	f	20	2026-10-21 09:06:12.774+00	2026-10-21 09:06:12.723+00	1310-58-3	KOH
22	1	GK-KCL-22	49	kg	potasyum-klorur	t	f	21	2026-10-21 09:06:12.9+00	2026-10-21 09:06:12.841+00	7447-40-7	KCl
23	5	GK-SDC-23	51	kg	sodyum-bikromat	t	f	22	2026-10-21 09:06:13.01+00	2026-10-21 09:06:12.965+00	7789-12-0	Na2Cr2O7·2H2O
24	4	GK-SMB-24	52	kg	sodyum-metabisulfit	t	f	23	2026-10-21 09:06:13.103+00	2026-10-21 09:06:13.062+00	7681-57-4	Na2S2O5
25	4	GK-HP-25	53	kg	hidrojen-peroksit	t	f	24	2026-10-21 09:06:13.186+00	2026-10-21 09:06:13.146+00	7722-84-1	H2O2
26	4	GK-IPA-26	54	kg	izopropil-alkol	t	f	25	2026-10-21 09:06:13.277+00	2026-10-21 09:06:13.236+00	67-63-0	C3H8O
\.


ALTER TABLE public.products ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v DISABLE TRIGGER ALL;

COPY public._products_v (id, parent_id, version_category_id, version_code, version_cover_image_id, version_unit, version_slug, version_is_active, version_featured, version_order, version_updated_at, version_created_at, created_at, updated_at, version_cas, version_formula) FROM stdin;
1	1	1	GK-NS-01	9	kg	nikel-sulfat	t	t	0	2026-10-16 06:24:01.124+00	2026-10-15 13:31:33.031+00	2026-10-16 06:24:01.189+00	2026-10-16 06:24:01.189+00	\N	\N
2	1	1	GK-NS-01	9	kg	nikel-sulfat	t	t	0	2026-10-16 06:24:01.329+00	2026-10-15 13:31:33.031+00	2026-10-16 06:24:01.39+00	2026-10-16 06:24:01.39+00	\N	\N
3	1	1	GK-NS-01	9	kg	nikel-sulfat	t	t	0	2026-10-16 06:39:28.529+00	2026-10-15 13:31:33.031+00	2026-10-16 06:39:28.575+00	2026-10-16 06:39:28.575+00	10101-97-0	NiSO4·6H2O
4	2	1	GK-NC-02	9	kg	nikel-klorur	t	f	1	2026-10-16 06:39:28.655+00	2026-10-15 13:31:33.128+00	2026-10-16 06:39:28.675+00	2026-10-16 06:39:28.675+00	7791-20-0	NiCl2·6H2O
5	3	1	GK-CS-03	10	kg	bakir-sulfat	t	t	2	2026-10-16 06:39:28.726+00	2026-10-15 13:31:33.235+00	2026-10-16 06:39:28.755+00	2026-10-16 06:39:28.755+00	7758-99-8	CuSO4·5H2O
6	4	1	GK-ZC-04	13	kg	cinko-klorur	t	f	3	2026-10-16 06:39:28.808+00	2026-10-15 13:31:33.316+00	2026-10-16 06:39:28.827+00	2026-10-16 06:39:28.827+00	7646-85-7	ZnCl2
7	5	2	GK-BA-05	13	kg	borik-asit	t	t	4	2026-10-16 06:39:28.88+00	2026-10-15 13:31:33.379+00	2026-10-16 06:39:28.905+00	2026-10-16 06:39:28.905+00	10043-35-3	H3BO3
8	6	2	GK-SA-06	8	lt	sulfurik-asit	t	f	5	2026-10-16 06:39:28.962+00	2026-10-15 13:31:33.452+00	2026-10-16 06:39:28.988+00	2026-10-16 06:39:28.988+00	7664-93-9	H2SO4
9	7	2	GK-CSD-07	13	kg	kostik-soda	t	f	6	2026-10-16 06:39:29.041+00	2026-10-15 13:31:33.53+00	2026-10-16 06:39:29.067+00	2026-10-16 06:39:29.067+00	1310-73-2	NaOH
10	8	3	GK-NA-08	11	kg	nikel-anot	t	t	7	2026-10-16 06:39:29.126+00	2026-10-15 13:31:33.62+00	2026-10-16 06:39:29.158+00	2026-10-16 06:39:29.158+00	7440-02-0	Ni
11	9	3	GK-CA-09	11	kg	fosforlu-bakir-anot	t	f	8	2026-10-16 06:39:29.221+00	2026-10-15 13:31:33.705+00	2026-10-16 06:39:29.247+00	2026-10-16 06:39:29.247+00	7440-50-8	Cu-P
12	10	3	GK-ZA-10	11	ton	cinko-anot	t	f	9	2026-10-16 06:39:29.302+00	2026-10-15 13:31:33.773+00	2026-10-16 06:39:29.33+00	2026-10-16 06:39:29.33+00	7440-66-6	Zn
13	11	4	GK-SS-11	14	kg	sakarin-sodyum	t	f	10	2026-10-16 06:39:29.4+00	2026-10-15 13:31:33.839+00	2026-10-16 06:39:29.433+00	2026-10-16 06:39:29.433+00	128-44-9	C7H4NNaO3S
14	12	5	GK-CR-12	10	kg	krom-iii-klorur	t	f	11	2026-10-16 06:39:29.489+00	2026-10-15 13:31:33.912+00	2026-10-16 06:39:29.508+00	2026-10-16 06:39:29.508+00	10060-12-5	CrCl3·6H2O
15	13	5	GK-CO-13	11	kg	kobalt-sulfat	t	f	12	2026-10-16 06:39:29.569+00	2026-10-15 13:31:33.973+00	2026-10-16 06:39:29.59+00	2026-10-16 06:39:29.59+00	10026-24-1	CoSO4·7H2O
16	14	6	GK-BLK-14	12	ton	dokme-kimyasal-sevkiyat	t	f	13	2026-10-16 06:39:29.654+00	2026-10-15 13:31:34.043+00	2026-10-16 06:39:29.687+00	2026-10-16 06:39:29.687+00	\N	\N
17	1	1	GK-NS-01	9	kg	nikel-sulfat-hekzahidrat	t	t	0	2026-10-16 08:07:50.589+00	2026-10-15 13:31:33.031+00	2026-10-16 08:07:50.699+00	2026-10-16 08:07:50.699+00	10101-97-0	NiSO4·6H2O
18	1	1	GK-NS-01	9	kg	nikel-sulfat	t	t	0	2026-10-16 08:08:14.94+00	2026-10-15 13:31:33.031+00	2026-10-16 08:08:14.997+00	2026-10-16 08:08:14.997+00	10101-97-0	NiSO4·6H2O
19	3	1	GK-CS-03	40	kg	bakir-sulfat	t	t	2	2026-10-21 09:06:11.413+00	2026-10-15 13:31:33.235+00	2026-10-21 09:06:11.444+00	2026-10-21 09:06:11.444+00	7758-99-8	CuSO4·5H2O
20	4	1	GK-ZC-04	36	kg	cinko-klorur	t	f	3	2026-10-21 09:06:11.535+00	2026-10-15 13:31:33.316+00	2026-10-21 09:06:11.557+00	2026-10-21 09:06:11.557+00	7646-85-7	ZnCl2
21	7	2	GK-CSD-07	44	kg	kostik-soda	t	f	6	2026-10-21 09:06:11.611+00	2026-10-15 13:31:33.53+00	2026-10-21 09:06:11.646+00	2026-10-21 09:06:11.646+00	1310-73-2	NaOH
22	14	6	GK-BLK-14	32	ton	dokme-kimyasal-sevkiyat	t	f	13	2026-10-21 09:06:11.728+00	2026-10-15 13:31:34.043+00	2026-10-21 09:06:11.758+00	2026-10-21 09:06:11.758+00	\N	\N
23	15	1	GK-AK-15	37	kg	amonyum-klorur	t	f	14	2026-10-21 09:06:11.811+00	2026-10-21 09:06:11.811+00	2026-10-21 09:06:11.822+00	2026-10-21 09:06:11.822+00	12125-02-9	NH4Cl
24	15	1	GK-AK-15	37	kg	amonyum-klorur	t	f	14	2026-10-21 09:06:11.873+00	2026-10-21 09:06:11.811+00	2026-10-21 09:06:11.888+00	2026-10-21 09:06:11.888+00	12125-02-9	NH4Cl
25	16	1	GK-BK-16	38	kg	baryum-klorur-dihidrat	t	f	15	2026-10-21 09:06:11.933+00	2026-10-21 09:06:11.933+00	2026-10-21 09:06:11.942+00	2026-10-21 09:06:11.942+00	10326-27-9	BaCl2·2H2O
26	16	1	GK-BK-16	38	kg	baryum-klorur-dihidrat	t	f	15	2026-10-21 09:06:11.984+00	2026-10-21 09:06:11.933+00	2026-10-21 09:06:12.001+00	2026-10-21 09:06:12.001+00	10326-27-9	BaCl2·2H2O
27	17	4	GK-SN-17	39	kg	sodyum-nitrat	t	f	16	2026-10-21 09:06:12.046+00	2026-10-21 09:06:12.046+00	2026-10-21 09:06:12.056+00	2026-10-21 09:06:12.056+00	7631-99-4	NaNO3
28	17	4	GK-SN-17	39	kg	sodyum-nitrat	t	f	16	2026-10-21 09:06:12.094+00	2026-10-21 09:06:12.046+00	2026-10-21 09:06:12.111+00	2026-10-21 09:06:12.111+00	7631-99-4	NaNO3
29	18	1	GK-NCN-18	41	kg	sodyum-siyanur	t	f	17	2026-10-21 09:06:12.174+00	2026-10-21 09:06:12.174+00	2026-10-21 09:06:12.19+00	2026-10-21 09:06:12.19+00	143-33-9	NaCN
30	18	1	GK-NCN-18	41	kg	sodyum-siyanur	t	f	17	2026-10-21 09:06:12.248+00	2026-10-21 09:06:12.174+00	2026-10-21 09:06:12.268+00	2026-10-21 09:06:12.268+00	143-33-9	NaCN
31	19	1	GK-KCN-19	50	kg	potasyum-siyanur	t	f	18	2026-10-21 09:06:12.32+00	2026-10-21 09:06:12.319+00	2026-10-21 09:06:12.33+00	2026-10-21 09:06:12.33+00	151-50-8	KCN
32	19	1	GK-KCN-19	50	kg	potasyum-siyanur	t	f	18	2026-10-21 09:06:12.368+00	2026-10-21 09:06:12.319+00	2026-10-21 09:06:12.403+00	2026-10-21 09:06:12.403+00	151-50-8	KCN
33	20	2	GK-CRO-20	45	kg	kromik-asit-krom-trioksit	t	f	19	2026-10-21 09:06:12.515+00	2026-10-21 09:06:12.515+00	2026-10-21 09:06:12.554+00	2026-10-21 09:06:12.554+00	1333-82-0	CrO3
34	20	2	GK-CRO-20	45	kg	kromik-asit-krom-trioksit	t	f	19	2026-10-21 09:06:12.642+00	2026-10-21 09:06:12.515+00	2026-10-21 09:06:12.669+00	2026-10-21 09:06:12.669+00	1333-82-0	CrO3
35	21	2	GK-KOH-21	48	kg	potasyum-hidroksit	t	f	20	2026-10-21 09:06:12.723+00	2026-10-21 09:06:12.723+00	2026-10-21 09:06:12.736+00	2026-10-21 09:06:12.736+00	1310-58-3	KOH
36	21	2	GK-KOH-21	48	kg	potasyum-hidroksit	t	f	20	2026-10-21 09:06:12.774+00	2026-10-21 09:06:12.723+00	2026-10-21 09:06:12.794+00	2026-10-21 09:06:12.794+00	1310-58-3	KOH
37	22	1	GK-KCL-22	49	kg	potasyum-klorur	t	f	21	2026-10-21 09:06:12.841+00	2026-10-21 09:06:12.841+00	2026-10-21 09:06:12.85+00	2026-10-21 09:06:12.85+00	7447-40-7	KCl
38	22	1	GK-KCL-22	49	kg	potasyum-klorur	t	f	21	2026-10-21 09:06:12.9+00	2026-10-21 09:06:12.841+00	2026-10-21 09:06:12.919+00	2026-10-21 09:06:12.919+00	7447-40-7	KCl
39	23	5	GK-SDC-23	51	kg	sodyum-bikromat	t	f	22	2026-10-21 09:06:12.965+00	2026-10-21 09:06:12.965+00	2026-10-21 09:06:12.974+00	2026-10-21 09:06:12.974+00	7789-12-0	Na2Cr2O7·2H2O
40	23	5	GK-SDC-23	51	kg	sodyum-bikromat	t	f	22	2026-10-21 09:06:13.01+00	2026-10-21 09:06:12.965+00	2026-10-21 09:06:13.026+00	2026-10-21 09:06:13.026+00	7789-12-0	Na2Cr2O7·2H2O
41	24	4	GK-SMB-24	52	kg	sodyum-metabisulfit	t	f	23	2026-10-21 09:06:13.062+00	2026-10-21 09:06:13.062+00	2026-10-21 09:06:13.072+00	2026-10-21 09:06:13.072+00	7681-57-4	Na2S2O5
42	24	4	GK-SMB-24	52	kg	sodyum-metabisulfit	t	f	23	2026-10-21 09:06:13.103+00	2026-10-21 09:06:13.062+00	2026-10-21 09:06:13.114+00	2026-10-21 09:06:13.114+00	7681-57-4	Na2S2O5
43	25	4	GK-HP-25	53	kg	hidrojen-peroksit	t	f	24	2026-10-21 09:06:13.146+00	2026-10-21 09:06:13.146+00	2026-10-21 09:06:13.155+00	2026-10-21 09:06:13.155+00	7722-84-1	H2O2
44	25	4	GK-HP-25	53	kg	hidrojen-peroksit	t	f	24	2026-10-21 09:06:13.186+00	2026-10-21 09:06:13.146+00	2026-10-21 09:06:13.208+00	2026-10-21 09:06:13.208+00	7722-84-1	H2O2
45	26	4	GK-IPA-26	54	kg	izopropil-alkol	t	f	25	2026-10-21 09:06:13.236+00	2026-10-21 09:06:13.236+00	2026-10-21 09:06:13.242+00	2026-10-21 09:06:13.242+00	67-63-0	C3H8O
46	26	4	GK-IPA-26	54	kg	izopropil-alkol	t	f	25	2026-10-21 09:06:13.277+00	2026-10-21 09:06:13.236+00	2026-10-21 09:06:13.29+00	2026-10-21 09:06:13.29+00	67-63-0	C3H8O
\.


ALTER TABLE public._products_v ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_locales DISABLE TRIGGER ALL;

COPY public._products_v_locales (version_name, version_summary, version_description, version_origin, id, _locale, _parent_id, version_meta_title, version_meta_description, version_meta_image_id) FROM stdin;
Nikel Sülfat	Nikel kaplama banyolarının ana hammaddesi. 	\N	Finlandiya	1	tr	1	\N	\N	\N
Nickel Sulphate	Primary raw material for nickel plating baths.	\N	Finland	2	en	1	\N	\N	\N
Nikel Sülfat	Nikel kaplama banyolarının ana hammaddesi.	\N	Finlandiya	3	tr	2	\N	\N	\N
Nickel Sulphate	Primary raw material for nickel plating baths.	\N	Finland	4	en	2	\N	\N	\N
Nikel Sülfat	Nikel kaplama banyolarının ana hammaddesi.	\N	Finlandiya	5	tr	3	\N	\N	\N
Nickel Sulphate	Primary raw material for nickel plating baths.	\N	Finland	6	en	3	\N	\N	\N
Nikel Klorür	Watts nikel banyoları için.	\N	Çin	7	tr	4	\N	\N	\N
Nickel Chloride	For Watts nickel baths.	\N	China	8	en	4	\N	\N	\N
Bakır Sülfat	Asidik bakır banyoları için mavi kristal.	\N	Almanya	9	tr	5	\N	\N	\N
Copper Sulphate	Blue crystals for acid copper baths.	\N	Germany	10	en	5	\N	\N	\N
Çinko Klorür	Asidik çinko banyoları için.	\N	Hindistan	11	tr	6	\N	\N	\N
Zinc Chloride	For acid zinc baths.	\N	India	12	en	6	\N	\N	\N
Borik Asit	Nikel banyolarında tampon madde.	\N	Türkiye	13	tr	7	\N	\N	\N
Boric Acid	Buffer agent for nickel baths.	\N	Türkiye	14	en	7	\N	\N	\N
Sülfürik Asit	Dekapaj ve banyo hazırlığı.	\N	Türkiye	15	tr	8	\N	\N	\N
Sulphuric Acid	Pickling and bath make-up.	\N	Türkiye	16	en	8	\N	\N	\N
Kostik Soda	Alkali çinko ve yağ alma banyoları.	\N	İtalya	17	tr	9	\N	\N	\N
Caustic Soda	Alkaline zinc and degreasing baths.	\N	Italy	18	en	9	\N	\N	\N
Nikel Anot	Pul ve plaka formunda nikel anot.	\N	Kanada	19	tr	10	\N	\N	\N
Nickel Anode	Nickel anodes in pellet and plate form.	\N	Canada	20	en	10	\N	\N	\N
Fosforlu Bakır Anot	Asidik bakır kaplama için.	\N	Almanya	21	tr	11	\N	\N	\N
Phosphorised Copper Anode	For acid copper plating.	\N	Germany	22	en	11	\N	\N	\N
Çinko Anot	Yüksek saflıkta çinko bilye ve plaka.	\N	Güney Kore	23	tr	12	\N	\N	\N
Zinc Anode	High-purity zinc balls and plates.	\N	South Korea	24	en	12	\N	\N	\N
Sakarin Sodyum	Nikel banyolarında birincil parlatıcı hammaddesi.	\N	Çin	25	tr	13	\N	\N	\N
Sodium Saccharin	Primary brightener raw material for nickel.	\N	China	26	en	13	\N	\N	\N
Krom (III) Klorür	Trivalent pasivasyon hammaddesi.	\N	Hindistan	27	tr	14	\N	\N	\N
Chromium (III) Chloride	Raw material for trivalent passivation.	\N	India	28	en	14	\N	\N	\N
Kobalt Sülfat	Pasivasyon ve alaşım banyoları için.	\N	Belçika	29	tr	15	\N	\N	\N
Cobalt Sulphate	For passivation and alloy baths.	\N	Belgium	30	en	15	\N	\N	\N
Dökme Kimyasal Sevkiyat	IBC ve tanker ile dökme tedarik.	\N	Çoklu	31	tr	16	\N	\N	\N
Bulk Chemical Shipment	Bulk supply in IBC and tankers.	\N	Multiple	32	en	16	\N	\N	\N
Nikel Sülfat	Nikel kaplama banyolarının ana hammaddesi.	\N	Finlandiya	33	tr	17	\N	\N	\N
Nickel Sulphate	Primary raw material for nickel plating baths.	\N	Finland	34	en	17	\N	\N	\N
Nikel Sülfat	Nikel kaplama banyolarının ana hammaddesi.	\N	Finlandiya	35	tr	18	\N	\N	\N
Nickel Sulphate	Primary raw material for nickel plating baths.	\N	Finland	36	en	18	\N	\N	\N
Bakır Sülfat	Asidik bakır banyoları için mavi kristal.	\N	Almanya	37	tr	19	\N	\N	\N
Copper Sulphate	Blue crystals for acid copper baths.	\N	Germany	38	en	19	\N	\N	\N
Çinko Klorür	Asidik çinko banyoları için.	\N	Hindistan	39	tr	20	\N	\N	\N
Zinc Chloride	For acid zinc baths.	\N	India	40	en	20	\N	\N	\N
Kostik Soda	Alkali çinko ve yağ alma banyoları.	\N	İtalya	41	tr	21	\N	\N	\N
Caustic Soda	Alkaline zinc and degreasing baths.	\N	Italy	42	en	21	\N	\N	\N
Dökme Kimyasal Sevkiyat	IBC ve tanker ile dökme tedarik.	\N	Çoklu	43	tr	22	\N	\N	\N
Bulk Chemical Shipment	Bulk supply in IBC and tankers.	\N	Multiple	44	en	22	\N	\N	\N
Amonyum Klorür	Asidik çinko banyolarında iletkenlik tuzu olarak kullanılır. 25 kg torba.	\N	\N	45	tr	23	\N	\N	\N
Amonyum Klorür	Asidik çinko banyolarında iletkenlik tuzu olarak kullanılır. 25 kg torba.	\N	\N	46	tr	24	\N	\N	\N
Ammonium Chloride	Conductivity salt for acid zinc baths. 25 kg bags.	\N	\N	47	en	24	\N	\N	\N
Baryum Klorür Dihidrat	Krom banyolarında sülfat dengesinin ayarlanmasında kullanılır. 25 kg torba.	\N	\N	48	tr	25	\N	\N	\N
Baryum Klorür Dihidrat	Krom banyolarında sülfat dengesinin ayarlanmasında kullanılır. 25 kg torba.	\N	\N	49	tr	26	\N	\N	\N
Barium Chloride Dihydrate	Used to adjust sulphate levels in chrome baths. 25 kg bags.	\N	\N	50	en	26	\N	\N	\N
Sodyum Nitrat	Fosfat ve karartma banyolarında oksitleyici katkı. 25 kg torba.	\N	\N	51	tr	27	\N	\N	\N
Sodyum Nitrat	Fosfat ve karartma banyolarında oksitleyici katkı. 25 kg torba.	\N	\N	52	tr	28	\N	\N	\N
Sodium Nitrate	Oxidising additive for phosphating and blackening baths. 25 kg bags.	\N	\N	53	en	28	\N	\N	\N
Sodyum Siyanür	Siyanürlü bakır ve çinko banyoları için. 50 kg varil.	\N	\N	54	tr	29	\N	\N	\N
Sodyum Siyanür	Siyanürlü bakır ve çinko banyoları için. 50 kg varil.	\N	\N	55	tr	30	\N	\N	\N
Sodium Cyanide	For cyanide copper and zinc baths. 50 kg drums.	\N	\N	56	en	30	\N	\N	\N
Potasyum Siyanür	Siyanürlü altın ve bakır banyoları için. 50 kg varil.	\N	\N	57	tr	31	\N	\N	\N
Potasyum Siyanür	Siyanürlü altın ve bakır banyoları için. 50 kg varil.	\N	\N	58	tr	32	\N	\N	\N
Potassium Cyanide	For cyanide gold and copper baths. 50 kg drums.	\N	\N	59	en	32	\N	\N	\N
Kromik Asit (Krom Trioksit)	Sert ve dekoratif krom banyolarının ana hammaddesi. Varil ambalaj.	\N	\N	60	tr	33	\N	\N	\N
Kromik Asit (Krom Trioksit)	Sert ve dekoratif krom banyolarının ana hammaddesi. Varil ambalaj.	\N	\N	61	tr	34	\N	\N	\N
Chromic Acid (Chromium Trioxide)	The main raw material of hard and decorative chrome baths. Drums.	\N	\N	62	en	34	\N	\N	\N
Potasyum Hidroksit	Alkali yağ alma ve pH ayarında kullanılır. 25 kg torba.	\N	\N	63	tr	35	\N	\N	\N
Potasyum Hidroksit	Alkali yağ alma ve pH ayarında kullanılır. 25 kg torba.	\N	\N	64	tr	36	\N	\N	\N
Potassium Hydroxide	Used in alkaline degreasing and pH adjustment. 25 kg bags.	\N	\N	65	en	36	\N	\N	\N
Potasyum Klorür	Klorürlü (asidik) çinko banyolarının temel tuzu. 25 kg torba.	\N	\N	66	tr	37	\N	\N	\N
Potasyum Klorür	Klorürlü (asidik) çinko banyolarının temel tuzu. 25 kg torba.	\N	\N	67	tr	38	\N	\N	\N
Potassium Chloride	Base salt of chloride (acid) zinc baths. 25 kg bags.	\N	\N	68	en	38	\N	\N	\N
Sodyum Bikromat	Kromat pasivasyon ve yüzey işlemlerinde kullanılır. 25 kg torba.	\N	\N	69	tr	39	\N	\N	\N
Sodyum Bikromat	Kromat pasivasyon ve yüzey işlemlerinde kullanılır. 25 kg torba.	\N	\N	70	tr	40	\N	\N	\N
Sodium Dichromate	Used in chromate passivation and surface treatment. 25 kg bags.	\N	\N	71	en	40	\N	\N	\N
Sodyum Metabisülfit	İndirgeyici; krom (VI) indirgeme ve atık su arıtımında kullanılır. 25 kg torba.	\N	\N	72	tr	41	\N	\N	\N
Sodyum Metabisülfit	İndirgeyici; krom (VI) indirgeme ve atık su arıtımında kullanılır. 25 kg torba.	\N	\N	73	tr	42	\N	\N	\N
Sodium Metabisulphite	Reducing agent for chromium (VI) reduction and wastewater treatment. 25 kg bags.	\N	\N	74	en	42	\N	\N	\N
Hidrojen Peroksit	Banyo arıtma ve yüzey hazırlamada oksitleyici olarak kullanılır. Varil.	\N	\N	75	tr	43	\N	\N	\N
Hidrojen Peroksit	Banyo arıtma ve yüzey hazırlamada oksitleyici olarak kullanılır. Varil.	\N	\N	76	tr	44	\N	\N	\N
Hydrogen Peroxide	Oxidiser for bath purification and surface preparation. Drums.	\N	\N	77	en	44	\N	\N	\N
İzopropil Alkol	Yüzey temizleme ve kurutmada kullanılan çözücü. 165 kg varil.	\N	\N	78	tr	45	\N	\N	\N
İzopropil Alkol	Yüzey temizleme ve kurutmada kullanılan çözücü. 165 kg varil.	\N	\N	79	tr	46	\N	\N	\N
Isopropyl Alcohol	Solvent for surface cleaning and drying. 165 kg drums.	\N	\N	80	en	46	\N	\N	\N
\.


ALTER TABLE public._products_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_rels; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_rels DISABLE TRIGGER ALL;

COPY public._products_v_rels (id, "order", parent_id, path, media_id, processes_id) FROM stdin;
1	1	1	version.gallery	6	\N
2	2	1	version.gallery	5	\N
3	1	2	version.gallery	6	\N
4	2	2	version.gallery	5	\N
5	1	3	version.processes	\N	10
6	2	3	version.processes	\N	1
7	1	3	version.gallery	6	\N
8	2	3	version.gallery	5	\N
9	1	4	version.processes	\N	10
10	1	4	version.gallery	6	\N
11	2	4	version.gallery	5	\N
12	1	5	version.processes	\N	3
13	2	5	version.processes	\N	12
14	1	5	version.gallery	6	\N
15	2	5	version.gallery	5	\N
16	1	6	version.processes	\N	4
17	2	6	version.processes	\N	5
18	1	6	version.gallery	6	\N
19	2	6	version.gallery	5	\N
20	1	7	version.processes	\N	10
21	1	7	version.gallery	6	\N
22	2	7	version.gallery	5	\N
23	1	8	version.processes	\N	3
24	2	8	version.processes	\N	13
25	1	8	version.gallery	6	\N
26	2	8	version.gallery	5	\N
27	1	9	version.processes	\N	4
28	2	9	version.processes	\N	13
29	1	9	version.gallery	6	\N
30	2	9	version.gallery	5	\N
31	1	10	version.processes	\N	10
32	1	10	version.gallery	6	\N
33	2	10	version.gallery	5	\N
34	1	11	version.processes	\N	3
35	1	11	version.gallery	6	\N
36	2	11	version.gallery	5	\N
37	1	12	version.processes	\N	4
38	1	12	version.gallery	6	\N
39	2	12	version.gallery	5	\N
40	1	13	version.processes	\N	10
41	1	13	version.gallery	6	\N
42	2	13	version.gallery	5	\N
43	1	14	version.processes	\N	8
44	2	14	version.processes	\N	11
45	1	14	version.gallery	6	\N
46	2	14	version.gallery	5	\N
47	1	15	version.processes	\N	11
48	1	15	version.gallery	6	\N
49	2	15	version.gallery	5	\N
50	1	16	version.gallery	4	\N
51	2	16	version.gallery	5	\N
52	1	17	version.processes	\N	10
53	2	17	version.processes	\N	1
54	1	17	version.gallery	6	\N
55	2	17	version.gallery	5	\N
56	1	18	version.processes	\N	10
57	2	18	version.processes	\N	1
58	1	18	version.gallery	6	\N
59	2	18	version.gallery	5	\N
60	1	19	version.processes	\N	3
61	2	19	version.processes	\N	12
62	1	20	version.processes	\N	4
63	2	20	version.processes	\N	5
64	1	20	version.gallery	35	\N
65	1	21	version.processes	\N	4
66	2	21	version.processes	\N	13
67	1	21	version.gallery	43	\N
68	2	21	version.gallery	33	\N
69	1	23	version.processes	\N	4
70	1	24	version.processes	\N	4
71	1	25	version.processes	\N	8
72	1	26	version.processes	\N	8
73	1	27	version.processes	\N	6
74	1	28	version.processes	\N	6
75	1	29	version.processes	\N	3
76	2	29	version.processes	\N	4
77	1	29	version.gallery	42	\N
78	1	30	version.processes	\N	3
79	2	30	version.processes	\N	4
80	1	30	version.gallery	42	\N
81	1	31	version.processes	\N	2
82	2	31	version.processes	\N	3
83	1	32	version.processes	\N	2
84	2	32	version.processes	\N	3
85	1	33	version.processes	\N	8
86	1	33	version.gallery	46	\N
87	2	33	version.gallery	34	\N
88	1	34	version.processes	\N	8
89	1	34	version.gallery	46	\N
90	2	34	version.gallery	34	\N
91	1	35	version.processes	\N	13
92	1	36	version.processes	\N	13
93	1	37	version.processes	\N	4
94	1	38	version.processes	\N	4
95	1	39	version.processes	\N	11
96	1	40	version.processes	\N	11
97	1	45	version.processes	\N	13
98	1	46	version.processes	\N	13
\.


ALTER TABLE public._products_v_rels ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_texts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_texts DISABLE TRIGGER ALL;

COPY public._products_v_texts (id, "order", parent_id, path, text) FROM stdin;
1	1	17	version.previousSlugs	nikel-sulfat
2	1	18	version.previousSlugs	nikel-sulfat-hekzahidrat
\.


ALTER TABLE public._products_v_texts ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_version_packaging; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_version_packaging DISABLE TRIGGER ALL;

COPY public._products_v_version_packaging (_order, _parent_id, id, _uuid) FROM stdin;
1	1	1	6ad0d5b5750a1f16844a0be3
2	1	2	6ad0d5b5750a1f16844a0be4
1	2	3	6ad0d5b5750a1f16844a0be3
2	2	4	6ad0d5b5750a1f16844a0be4
1	3	5	6ad0d5b5750a1f16844a0be3
2	3	6	6ad0d5b5750a1f16844a0be4
1	4	7	6ad0d5b5750a1f16844a0be7
1	5	8	6ad0d5b5750a1f16844a0bea
2	5	9	6ad0d5b5750a1f16844a0beb
1	6	10	6ad0d5b5750a1f16844a0bee
1	7	11	6ad0d5b5750a1f16844a0bf1
2	7	12	6ad0d5b5750a1f16844a0bf2
1	8	13	6ad0d5b5750a1f16844a0bf5
2	8	14	6ad0d5b5750a1f16844a0bf6
1	9	15	6ad0d5b5750a1f16844a0bf9
1	10	16	6ad0d5b5750a1f16844a0bfc
1	11	17	6ad0d5b5750a1f16844a0bfe
1	12	18	6ad0d5b5750a1f16844a0c00
1	13	19	6ad0d5b5750a1f16844a0c02
1	14	20	6ad0d5b5750a1f16844a0c04
1	15	21	6ad0d5b5750a1f16844a0c06
1	16	22	6ad0d5b6750a1f16844a0c07
2	16	23	6ad0d5b6750a1f16844a0c08
1	17	24	6ad0d5b5750a1f16844a0be3
2	17	25	6ad0d5b5750a1f16844a0be4
1	18	26	6ad0d5b5750a1f16844a0be3
2	18	27	6ad0d5b5750a1f16844a0be4
1	19	28	6ad0d5b5750a1f16844a0bea
2	19	29	6ad0d5b5750a1f16844a0beb
1	20	30	6ad0d5b5750a1f16844a0bee
1	21	31	6ad0d5b5750a1f16844a0bf9
1	22	32	6ad0d5b6750a1f16844a0c07
2	22	33	6ad0d5b6750a1f16844a0c08
\.


ALTER TABLE public._products_v_version_packaging ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_version_packaging_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_version_packaging_locales DISABLE TRIGGER ALL;

COPY public._products_v_version_packaging_locales (label, id, _locale, _parent_id) FROM stdin;
25 kg torba	1	tr	1
25 kg bag	2	en	1
1000 kg big bag	3	tr	2
1000 kg big bag	4	en	2
25 kg torba	5	tr	3
25 kg bag	6	en	3
1000 kg big bag	7	tr	4
1000 kg big bag	8	en	4
25 kg torba	9	tr	5
25 kg bag	10	en	5
1000 kg big bag	11	tr	6
1000 kg big bag	12	en	6
25 kg torba	13	tr	7
25 kg bag	14	en	7
25 kg torba	15	tr	8
25 kg bag	16	en	8
1000 kg big bag	17	tr	9
1000 kg big bag	18	en	9
25 kg torba	19	tr	10
25 kg bag	20	en	10
25 kg torba	21	tr	11
25 kg bag	22	en	11
1000 kg big bag	23	tr	12
1000 kg big bag	24	en	12
200 lt varil	25	tr	13
200 L drum	26	en	13
1000 lt IBC	27	tr	14
1000 L IBC	28	en	14
25 kg torba	29	tr	15
25 kg bag	30	en	15
50 kg kasa	31	tr	16
50 kg case	32	en	16
Kasa	33	tr	17
Case	34	en	17
1 ton palet	35	tr	18
1 t pallet	36	en	18
25 kg torba	37	tr	19
25 kg bag	38	en	19
25 kg torba	39	tr	20
25 kg bag	40	en	20
25 kg torba	41	tr	21
25 kg bag	42	en	21
1000 lt IBC	43	tr	22
1000 L IBC	44	en	22
Tanker	45	tr	23
Tanker	46	en	23
25 kg torba	47	tr	24
25 kg bag	48	en	24
1000 kg big bag	49	tr	25
1000 kg big bag	50	en	25
25 kg torba	51	tr	26
25 kg bag	52	en	26
1000 kg big bag	53	tr	27
1000 kg big bag	54	en	27
25 kg torba	55	tr	28
25 kg bag	56	en	28
1000 kg big bag	57	tr	29
1000 kg big bag	58	en	29
25 kg torba	59	tr	30
25 kg bag	60	en	30
25 kg torba	61	tr	31
25 kg bag	62	en	31
1000 lt IBC	63	tr	32
1000 L IBC	64	en	32
Tanker	65	tr	33
Tanker	66	en	33
\.


ALTER TABLE public._products_v_version_packaging_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_version_specs; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_version_specs DISABLE TRIGGER ALL;

COPY public._products_v_version_specs (_order, _parent_id, id, _uuid) FROM stdin;
1	1	1	6ad0d5b5750a1f16844a0be0
2	1	2	6ad0d5b5750a1f16844a0be1
3	1	3	6ad0d5b5750a1f16844a0be2
1	2	4	6ad0d5b5750a1f16844a0be0
2	2	5	6ad0d5b5750a1f16844a0be1
3	2	6	6ad0d5b5750a1f16844a0be2
1	3	7	6ad0d5b5750a1f16844a0be1
2	3	8	6ad0d5b5750a1f16844a0be2
1	4	9	6ad0d5b5750a1f16844a0be6
1	5	10	6ad0d5b5750a1f16844a0be9
1	6	11	6ad0d5b5750a1f16844a0bed
1	7	12	6ad0d5b5750a1f16844a0bf0
1	8	13	6ad0d5b5750a1f16844a0bf4
1	9	14	6ad0d5b5750a1f16844a0bf8
1	10	15	6ad0d5b5750a1f16844a0bfa
2	10	16	6ad0d5b5750a1f16844a0bfb
1	11	17	6ad0d5b5750a1f16844a0bfd
1	12	18	6ad0d5b5750a1f16844a0bff
1	17	19	6ad0d5b5750a1f16844a0be1
2	17	20	6ad0d5b5750a1f16844a0be2
1	18	21	6ad0d5b5750a1f16844a0be1
2	18	22	6ad0d5b5750a1f16844a0be2
1	19	23	6ad0d5b5750a1f16844a0be9
1	20	24	6ad0d5b5750a1f16844a0bed
1	21	25	6ad0d5b5750a1f16844a0bf8
\.


ALTER TABLE public._products_v_version_specs ENABLE TRIGGER ALL;

--
-- Data for Name: _products_v_version_specs_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._products_v_version_specs_locales DISABLE TRIGGER ALL;

COPY public._products_v_version_specs_locales (label, value, id, _locale, _parent_id) FROM stdin;
CAS No	10101-97-0	1	tr	1
CAS No	10101-97-0	2	en	1
Saflık	≥ %22 Ni	3	tr	2
Purity	≥ %22 Ni	4	en	2
Görünüm	Yeşil kristal	5	tr	3
Appearance	Yeşil kristal	6	en	3
CAS No	10101-97-0	7	tr	4
CAS No	10101-97-0	8	en	4
Saflık	≥ %22 Ni	9	tr	5
Purity	≥ %22 Ni	10	en	5
Görünüm	Yeşil kristal	11	tr	6
Appearance	Yeşil kristal	12	en	6
Saflık	≥ %22 Ni	13	tr	7
Purity	≥ %22 Ni	14	en	7
Görünüm	Yeşil kristal	15	tr	8
Appearance	Yeşil kristal	16	en	8
Saflık	≥ %24 Ni	17	tr	9
Purity	≥ %24 Ni	18	en	9
Saflık	≥ %25 Cu	19	tr	10
Purity	≥ %25 Cu	20	en	10
Saflık	≥ %98	21	tr	11
Purity	≥ %98	22	en	11
Saflık	≥ %99.9	23	tr	12
Purity	≥ %99.9	24	en	12
Saflık	%98	25	tr	13
Purity	%98	26	en	13
Görünüm	Pul / Flake	27	tr	14
Appearance	Pul / Flake	28	en	14
Saflık	≥ %99.9 Ni	29	tr	15
Purity	≥ %99.9 Ni	30	en	15
Görünüm	Pellet / Plaka	31	tr	16
Appearance	Pellet / Plaka	32	en	16
Saflık	P: %0.04–0.06	33	tr	17
Purity	P: %0.04–0.06	34	en	17
Saflık	≥ %99.995 Zn	35	tr	18
Purity	≥ %99.995 Zn	36	en	18
Saflık	≥ %22 Ni	37	tr	19
Purity	≥ %22 Ni	38	en	19
Görünüm	Yeşil kristal	39	tr	20
Appearance	Yeşil kristal	40	en	20
Saflık	≥ %22 Ni	41	tr	21
Purity	≥ %22 Ni	42	en	21
Görünüm	Yeşil kristal	43	tr	22
Appearance	Yeşil kristal	44	en	22
Saflık	≥ %25 Cu	45	tr	23
Purity	≥ %25 Cu	46	en	23
Saflık	≥ %98	47	tr	24
Purity	≥ %98	48	en	24
Görünüm	Pul / Flake	49	tr	25
Appearance	Pul / Flake	50	en	25
\.


ALTER TABLE public._products_v_version_specs_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _quote_page_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._quote_page_v DISABLE TRIGGER ALL;

COPY public._quote_page_v (id, version_hero_image_id, version_updated_at, version_created_at, created_at, updated_at) FROM stdin;
\.


ALTER TABLE public._quote_page_v ENABLE TRIGGER ALL;

--
-- Data for Name: _quote_page_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._quote_page_v_locales DISABLE TRIGGER ALL;

COPY public._quote_page_v_locales (version_hero_title, version_hero_subtitle, version_success_message, id, _locale, _parent_id) FROM stdin;
\.


ALTER TABLE public._quote_page_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _site_settings_v; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._site_settings_v DISABLE TRIGGER ALL;

COPY public._site_settings_v (id, version_site_name, version_logo_id, version_logo_light_id, version_map_lat, version_map_lng, version_updated_at, version_created_at, created_at, updated_at, version_whatsapp_number, version_legal_name, version_fax) FROM stdin;
1	Güven Galvano Kimyasalları	15	16	40.7654	29.9408	2026-10-16 06:24:00.896+00	2026-10-15 13:31:36.076+00	2026-10-16 06:24:00.926+00	2026-10-16 06:24:00.926+00	\N	\N	\N
2	Güven Galvano Kimyasalları	15	16	40.7654	29.9408	2026-10-16 06:39:30.189+00	2026-10-15 13:31:36.076+00	2026-10-16 06:39:30.212+00	2026-10-16 06:39:30.212+00	+90 262 000 00 00	\N	\N
3	Güven Galvano Kimyasalları	15	16	40.7654	29.9408	2026-10-16 06:39:30.262+00	2026-10-15 13:31:36.076+00	2026-10-16 06:39:30.283+00	2026-10-16 06:39:30.283+00	+90 262 000 00 00	\N	\N
4	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:55:59.017+00	2026-10-15 13:31:36.076+00	2026-10-30 06:55:59.066+00	2026-10-30 06:55:59.066+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
5	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:55:59.15+00	2026-10-15 13:31:36.076+00	2026-10-30 06:55:59.182+00	2026-10-30 06:55:59.182+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
6	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:56:13.761+00	2026-10-15 13:31:36.076+00	2026-10-30 06:56:13.803+00	2026-10-30 06:56:13.803+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
7	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:56:13.889+00	2026-10-15 13:31:36.076+00	2026-10-30 06:56:13.911+00	2026-10-30 06:56:13.911+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
8	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:56:55.173+00	2026-10-15 13:31:36.076+00	2026-10-30 06:56:55.208+00	2026-10-30 06:56:55.208+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
9	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:56:55.265+00	2026-10-15 13:31:36.076+00	2026-10-30 06:56:55.289+00	2026-10-30 06:56:55.289+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
\.


ALTER TABLE public._site_settings_v ENABLE TRIGGER ALL;

--
-- Data for Name: _site_settings_v_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._site_settings_v_locales DISABLE TRIGGER ALL;

COPY public._site_settings_v_locales (version_tagline, version_footer_note, version_address, id, _locale, _parent_id, version_whatsapp_message) FROM stdin;
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	1	tr	1	\N
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	2	en	1	\N
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	3	tr	2	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	4	en	2	\N
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	5	tr	3	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	6	en	3	Hello, I would like to get information about your products.
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	7	tr	4	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye	8	en	4	Hello, I would like to get information about your products.
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	9	tr	5	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye	10	en	5	Hello, I would like to get information about your products.
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	11	tr	6	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye	12	en	6	Hello, I would like to get information about your products.
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	13	tr	7	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye	14	en	7	Hello, I would like to get information about your products.
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	15	tr	8	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye	16	en	8	Hello, I would like to get information about your products.
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	17	tr	9	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye	18	en	9	Hello, I would like to get information about your products.
\.


ALTER TABLE public._site_settings_v_locales ENABLE TRIGGER ALL;

--
-- Data for Name: _site_settings_v_version_emails; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._site_settings_v_version_emails DISABLE TRIGGER ALL;

COPY public._site_settings_v_version_emails (_order, _parent_id, id, email, _uuid) FROM stdin;
1	1	1	info@galvanokimya.com	6ad0d5b8750a1f16844a0c2a
1	2	2	info@galvanokimya.com	6ad0d5b8750a1f16844a0c2a
1	3	3	info@galvanokimya.com	6ad0d5b8750a1f16844a0c2a
1	4	4	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb2
1	5	5	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb2
1	6	6	info@guvengalvanokimya.com	6ae43f8dab5d2381a8993d38
1	7	7	info@guvengalvanokimya.com	6ae43f8dab5d2381a8993d38
1	8	8	info@guvengalvanokimya.com	6ae43fb798e1cd8b58530eae
1	9	9	info@guvengalvanokimya.com	6ae43fb798e1cd8b58530eae
\.


ALTER TABLE public._site_settings_v_version_emails ENABLE TRIGGER ALL;

--
-- Data for Name: _site_settings_v_version_phones; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._site_settings_v_version_phones DISABLE TRIGGER ALL;

COPY public._site_settings_v_version_phones (_order, _parent_id, id, number, _uuid) FROM stdin;
1	1	1	+90 262 000 00 00	6ad0d5b8750a1f16844a0c29
1	2	2	+90 262 000 00 00	6ad0d5b8750a1f16844a0c29
1	3	3	+90 262 000 00 00	6ad0d5b8750a1f16844a0c29
1	4	4	+90 212 485 88 25	6ae43f7fb95733a7c8a4bcb0
2	4	5	+90 212 485 88 26	6ae43f7fb95733a7c8a4bcb1
1	5	6	+90 212 485 88 25	6ae43f7fb95733a7c8a4bcb0
2	5	7	+90 212 485 88 26	6ae43f7fb95733a7c8a4bcb1
1	6	8	+90 212 485 88 25	6ae43f8dab5d2381a8993d36
2	6	9	+90 212 485 88 26	6ae43f8dab5d2381a8993d37
1	7	10	+90 212 485 88 25	6ae43f8dab5d2381a8993d36
2	7	11	+90 212 485 88 26	6ae43f8dab5d2381a8993d37
1	8	12	+90 212 485 88 25	6ae43fb798e1cd8b58530eac
2	8	13	+90 212 485 88 26	6ae43fb798e1cd8b58530ead
1	9	14	+90 212 485 88 25	6ae43fb798e1cd8b58530eac
2	9	15	+90 212 485 88 26	6ae43fb798e1cd8b58530ead
\.


ALTER TABLE public._site_settings_v_version_phones ENABLE TRIGGER ALL;

--
-- Data for Name: _site_settings_v_version_quote_recipients; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._site_settings_v_version_quote_recipients DISABLE TRIGGER ALL;

COPY public._site_settings_v_version_quote_recipients (_order, _parent_id, id, email, _uuid) FROM stdin;
1	1	1	teklif@galvanokimya.com	6ad0d5b8750a1f16844a0c2d
1	2	2	teklif@galvanokimya.com	6ad0d5b8750a1f16844a0c2d
1	3	3	teklif@galvanokimya.com	6ad0d5b8750a1f16844a0c2d
1	4	4	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb3
1	5	5	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb3
1	6	6	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb3
1	7	7	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb3
1	8	8	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb3
1	9	9	info@guvengalvanokimya.com	6ae43f7fb95733a7c8a4bcb3
\.


ALTER TABLE public._site_settings_v_version_quote_recipients ENABLE TRIGGER ALL;

--
-- Data for Name: _site_settings_v_version_socials; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._site_settings_v_version_socials DISABLE TRIGGER ALL;

COPY public._site_settings_v_version_socials (_order, _parent_id, id, platform, url, _uuid) FROM stdin;
1	1	1	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	1	2	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	2	3	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	2	4	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	3	5	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	3	6	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	4	7	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	4	8	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	5	9	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	5	10	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	6	11	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	6	12	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	7	13	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	7	14	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	8	15	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	8	16	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
1	9	17	linkedin	https://www.linkedin.com	6ad0d5b8750a1f16844a0c2b
2	9	18	instagram	https://www.instagram.com	6ad0d5b8750a1f16844a0c2c
\.


ALTER TABLE public._site_settings_v_version_socials ENABLE TRIGGER ALL;

--
-- Data for Name: about_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page DISABLE TRIGGER ALL;

COPY public.about_page (id, hero_image_id, updated_at, created_at, cta_image_id) FROM stdin;
1	30	2026-10-30 06:56:55.395+00	2026-10-15 13:31:35.467+00	32
\.


ALTER TABLE public.about_page ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_company_facts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_company_facts DISABLE TRIGGER ALL;

COPY public.about_page_company_facts (_order, _parent_id, id) FROM stdin;
1	1	6ad9e22364bf1cbb40c0e038
2	1	6ae43f7fb95733a7c8a4bcb4
3	1	6ad9e22364bf1cbb40c0e039
4	1	6ad9e22364bf1cbb40c0e03a
5	1	6ad9e22364bf1cbb40c0e03b
6	1	6ad9e22364bf1cbb40c0e03c
\.


ALTER TABLE public.about_page_company_facts ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_company_facts_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_company_facts_locales DISABLE TRIGGER ALL;

COPY public.about_page_company_facts_locales (label, value, id, _locale, _parent_id) FROM stdin;
Merkez	İkitelli OSB, Başakşehir / İstanbul	37	tr	6ad9e22364bf1cbb40c0e038
Head office	İkitelli OSB, Başakşehir / Istanbul	38	en	6ad9e22364bf1cbb40c0e038
Depo	Çatalca / İstanbul	39	tr	6ae43f7fb95733a7c8a4bcb4
Warehouse	Çatalca / Istanbul	40	en	6ae43f7fb95733a7c8a4bcb4
Faaliyet alanı	İthalat · İhracat · Toptan	41	tr	6ad9e22364bf1cbb40c0e039
Business	Import · Export · Wholesale	42	en	6ad9e22364bf1cbb40c0e039
Ürün yelpazesi	26+ ürün, 6 grup	43	tr	6ad9e22364bf1cbb40c0e03a
Product range	26+ products, 6 groups	44	en	6ad9e22364bf1cbb40c0e03a
Ambalaj	Torba · Varil · IBC · Dökme	45	tr	6ad9e22364bf1cbb40c0e03b
Packaging	Bag · Drum · IBC · Bulk	46	en	6ad9e22364bf1cbb40c0e03b
Teknik belgeler	TDS / MSDS talep üzerine	47	tr	6ad9e22364bf1cbb40c0e03c
Technical documents	TDS / MSDS on request	48	en	6ad9e22364bf1cbb40c0e03c
\.


ALTER TABLE public.about_page_company_facts_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_locales DISABLE TRIGGER ALL;

COPY public.about_page_locales (hero_title, hero_subtitle, intro, gallery_title, id, _locale, _parent_id, meta_title, meta_description, meta_image_id, company_eyebrow, company_title, company_body, services_eyebrow, services_title, services_intro, sectors_title, sectors_text, values_title, timeline_title, cta_title, cta_text) FROM stdin;
Hakkımızda	Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.	Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.	Depodan ve sevkiyattan kareler	18	tr	1	\N	\N	\N	Biz kimiz	Kaplama sektörünün hammadde tedarikçisi	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	Ne yapıyoruz	Kaynaktan banyonuza kadar tedarik zinciri	Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.	Hizmet verdiğimiz prosesler	Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.	Çalışma ilkelerimiz	Yolculuğumuz	İhtiyacınız olan hammadde stokta olabilir	Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.
About Us	Raw materials from around the world for the plating industry, delivered reliably from Çatalca.	We source, stock and deliver on time the raw materials that plating companies need, from all over the world.	From our warehouse and shipments	19	en	1	\N	\N	\N	Who we are	Raw material supplier to the plating industry	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Güven Galvano Kimyasalları is an import, export and wholesale company supplying raw materials to the electroplating and surface treatment industry. We do not do plating ourselves; we source the metal salts, acids and bases, anodes and auxiliary chemicals used in plating baths and deliver them on time.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Working with producers in Europe and Asia, we offer a wide range from nickel, copper and zinc salts to chromic acid, from cyanide salts to caustic soda — all from a single supplier. Products are delivered in their original packaging with the producer’s labels and documents.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Our warehouse in Çatalca, Istanbul, lets us keep frequently used raw materials in stock and dispatch orders quickly. We offer delivery options to suit every need, from bags and drums to IBC tanks and bulk shipments.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Besides plating companies across Türkiye, we export to customers in neighbouring markets. Documents such as technical data sheets (TDS) and safety data sheets (MSDS) are shared with the product on request.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	What we do	The supply chain from source to your bath	We manage every step from buying at the producer to delivery at your plant, so you can focus on production.	Processes we serve	Our products are used for bath make-up and replenishment across many plating and surface treatment processes.	How we work	Our journey	The raw material you need may already be in stock	Browse our catalogue or add your needs to the quote basket and we will get back to you shortly.
\.


ALTER TABLE public.about_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_rels; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_rels DISABLE TRIGGER ALL;

COPY public.about_page_rels (id, "order", parent_id, path, media_id) FROM stdin;
55	1	1	gallery.images	30
56	2	1	gallery.images	31
57	3	1	gallery.images	32
58	4	1	gallery.images	33
59	5	1	gallery.images	34
60	6	1	gallery.images	35
\.


ALTER TABLE public.about_page_rels ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_sectors_items; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_sectors_items DISABLE TRIGGER ALL;

COPY public.about_page_sectors_items (_order, _parent_id, id) FROM stdin;
1	1	6ad9e22364bf1cbb40c0e045
2	1	6ad9e22364bf1cbb40c0e046
3	1	6ad9e22364bf1cbb40c0e047
4	1	6ad9e22364bf1cbb40c0e048
5	1	6ad9e22364bf1cbb40c0e049
6	1	6ad9e22364bf1cbb40c0e04a
7	1	6ad9e22364bf1cbb40c0e04b
8	1	6ad9e22364bf1cbb40c0e04c
9	1	6ad9e22364bf1cbb40c0e04d
\.


ALTER TABLE public.about_page_sectors_items ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_sectors_items_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_sectors_items_locales DISABLE TRIGGER ALL;

COPY public.about_page_sectors_items_locales (label, id, _locale, _parent_id) FROM stdin;
Nikel kaplama	64	tr	6ad9e22364bf1cbb40c0e045
Nickel plating	65	en	6ad9e22364bf1cbb40c0e045
Krom kaplama	66	tr	6ad9e22364bf1cbb40c0e046
Chrome plating	67	en	6ad9e22364bf1cbb40c0e046
Çinko kaplama	68	tr	6ad9e22364bf1cbb40c0e047
Zinc plating	69	en	6ad9e22364bf1cbb40c0e047
Bakır kaplama	70	tr	6ad9e22364bf1cbb40c0e048
Copper plating	71	en	6ad9e22364bf1cbb40c0e048
Altın & değerli metal	72	tr	6ad9e22364bf1cbb40c0e049
Gold & precious metals	73	en	6ad9e22364bf1cbb40c0e049
Pasivasyon	74	tr	6ad9e22364bf1cbb40c0e04a
Passivation	75	en	6ad9e22364bf1cbb40c0e04a
Fosfat kaplama	76	tr	6ad9e22364bf1cbb40c0e04b
Phosphating	77	en	6ad9e22364bf1cbb40c0e04b
Yağ alma & ön işlem	78	tr	6ad9e22364bf1cbb40c0e04c
Degreasing & pre-treatment	79	en	6ad9e22364bf1cbb40c0e04c
Atık su arıtımı	80	tr	6ad9e22364bf1cbb40c0e04d
Wastewater treatment	81	en	6ad9e22364bf1cbb40c0e04d
\.


ALTER TABLE public.about_page_sectors_items_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_services_items; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_services_items DISABLE TRIGGER ALL;

COPY public.about_page_services_items (_order, _parent_id, id, icon) FROM stdin;
1	1	6ad9e22364bf1cbb40c0e041	globe
2	1	6ad9e22364bf1cbb40c0e042	warehouse
3	1	6ad9e22364bf1cbb40c0e043	truck
4	1	6ad9e22364bf1cbb40c0e044	document
\.


ALTER TABLE public.about_page_services_items ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_services_items_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_services_items_locales DISABLE TRIGGER ALL;

COPY public.about_page_services_items_locales (title, text, id, _locale, _parent_id) FROM stdin;
Tedarik & ithalat	Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.	29	tr	6ad9e22364bf1cbb40c0e041
Sourcing & import	We buy directly from reliable producers and handle customs and import procedures for you.	30	en	6ad9e22364bf1cbb40c0e041
Depolama	Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.	31	tr	6ad9e22364bf1cbb40c0e042
Warehousing	We keep critical raw materials in stock at our Çatalca warehouse so your production never stops.	32	en	6ad9e22364bf1cbb40c0e042
Sevkiyat & lojistik	Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.	33	tr	6ad9e22364bf1cbb40c0e043
Shipping & logistics	Bags, drums, IBCs or bulk — we plan domestic and export shipments and deliver to your door.	34	en	6ad9e22364bf1cbb40c0e043
Belge desteği	TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.	35	tr	6ad9e22364bf1cbb40c0e044
Document support	We promptly provide product documents such as TDS, MSDS and certificates of origin on request.	36	en	6ad9e22364bf1cbb40c0e044
\.


ALTER TABLE public.about_page_services_items_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_stats; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_stats DISABLE TRIGGER ALL;

COPY public.about_page_stats (_order, _parent_id, id, value, suffix) FROM stdin;
1	1	6ad9e22364bf1cbb40c0e03d	26	+
2	1	6ad9e22364bf1cbb40c0e03e	6	
3	1	6ad9e22364bf1cbb40c0e03f	13	
4	1	6ad9e22364bf1cbb40c0e040	14	+
\.


ALTER TABLE public.about_page_stats ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_stats_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_stats_locales DISABLE TRIGGER ALL;

COPY public.about_page_stats_locales (label, id, _locale, _parent_id) FROM stdin;
Ürün	29	tr	6ad9e22364bf1cbb40c0e03d
Products	30	en	6ad9e22364bf1cbb40c0e03d
Ürün grubu	31	tr	6ad9e22364bf1cbb40c0e03e
Product groups	32	en	6ad9e22364bf1cbb40c0e03e
Kaplama prosesi	33	tr	6ad9e22364bf1cbb40c0e03f
Plating processes	34	en	6ad9e22364bf1cbb40c0e03f
Tedarik & ihracat noktası	35	tr	6ad9e22364bf1cbb40c0e040
Sourcing & export points	36	en	6ad9e22364bf1cbb40c0e040
\.


ALTER TABLE public.about_page_stats_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_story; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_story DISABLE TRIGGER ALL;

COPY public.about_page_story (_order, _parent_id, id, image_id) FROM stdin;
1	1	6ad9e22364bf1cbb40c0e04e	3
2	1	6ad9e22364bf1cbb40c0e04f	31
3	1	6ad9e22364bf1cbb40c0e050	33
\.


ALTER TABLE public.about_page_story ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_story_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_story_locales DISABLE TRIGGER ALL;

COPY public.about_page_story_locales (title, text, id, _locale, _parent_id) FROM stdin;
Küresel tedarik ağı	Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.	49	tr	6ad9e22364bf1cbb40c0e04e
Global sourcing network	Long-standing relationships with producers in Europe and Asia let us buy raw materials directly at the source — meaning stable prices and continuous supply.\n\nWe follow market movements closely and keep our customers informed about prices and lead times in advance.	50	en	6ad9e22364bf1cbb40c0e04e
Çatalca deposu	İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.	51	tr	6ad9e22364bf1cbb40c0e04f
Çatalca warehouse	At our warehouse in Çatalca, Istanbul, we keep frequently used products in stock. Palletised storage and forklift loading let us prepare and dispatch orders quickly.\n\nChemicals are stored in their original packaging, separated by type and hazard class.	52	en	6ad9e22364bf1cbb40c0e04f
İhracat ve sevkiyat	Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.	53	tr	6ad9e22364bf1cbb40c0e050
Export and shipping	Alongside regular deliveries to plating companies in Türkiye, we export to customers in neighbouring countries with full and part container loads.\n\nWe manage the whole process, including export documents, dangerous goods (ADR/IMDG) requirements and packaging choice.	54	en	6ad9e22364bf1cbb40c0e050
\.


ALTER TABLE public.about_page_story_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_timeline; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_timeline DISABLE TRIGGER ALL;

COPY public.about_page_timeline (_order, _parent_id, id, year) FROM stdin;
\.


ALTER TABLE public.about_page_timeline ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_timeline_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_timeline_locales DISABLE TRIGGER ALL;

COPY public.about_page_timeline_locales (title, id, _locale, _parent_id, text) FROM stdin;
\.


ALTER TABLE public.about_page_timeline_locales ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_values; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_values DISABLE TRIGGER ALL;

COPY public.about_page_values (_order, _parent_id, id, icon) FROM stdin;
1	1	6ad9e22364bf1cbb40c0e051	handshake
2	1	6ad9e22364bf1cbb40c0e052	warehouse
3	1	6ad9e22364bf1cbb40c0e053	shield
4	1	6ad9e22364bf1cbb40c0e054	clock
\.


ALTER TABLE public.about_page_values ENABLE TRIGGER ALL;

--
-- Data for Name: about_page_values_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.about_page_values_locales DISABLE TRIGGER ALL;

COPY public.about_page_values_locales (title, text, id, _locale, _parent_id) FROM stdin;
Güven	Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.	65	tr	6ad9e22364bf1cbb40c0e051
Trust	We live up to our name: the right product, the right quantity, delivered on time.	66	en	6ad9e22364bf1cbb40c0e051
Stok gücü	Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.	67	tr	6ad9e22364bf1cbb40c0e052
Stock strength	Keeping critical raw materials in stock helps your production run without interruption.	68	en	6ad9e22364bf1cbb40c0e052
Güvenli taşıma	Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.	69	tr	6ad9e22364bf1cbb40c0e053
Safe handling	Dangerous goods are moved with compliant packaging, labels and documents.	70	en	6ad9e22364bf1cbb40c0e053
Hızlı yanıt	Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.	71	tr	6ad9e22364bf1cbb40c0e054
Quick response	We aim to answer quote and document requests the same day.	72	en	6ad9e22364bf1cbb40c0e054
\.


ALTER TABLE public.about_page_values_locales ENABLE TRIGGER ALL;

--
-- Data for Name: contact_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.contact_page DISABLE TRIGGER ALL;

COPY public.contact_page (id, hero_image_id, updated_at, created_at) FROM stdin;
1	1	2026-10-15 13:31:36.028+00	2026-10-15 13:31:36.014+00
\.


ALTER TABLE public.contact_page ENABLE TRIGGER ALL;

--
-- Data for Name: contact_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.contact_page_locales DISABLE TRIGGER ALL;

COPY public.contact_page_locales (hero_title, hero_subtitle, form_title, id, _locale, _parent_id, meta_title, meta_description, meta_image_id) FROM stdin;
İletişim	Size nasıl yardımcı olabiliriz?	Bize yazın	2	tr	1	\N	\N	\N
Contact	How can we help?	Write to us	3	en	1	\N	\N	\N
\.


ALTER TABLE public.contact_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: home_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page DISABLE TRIGGER ALL;

COPY public.home_page (id, hub_lat, hub_lng, showcase_image_id, showcase_video_id, cta_image_id, updated_at, created_at) FROM stdin;
1	41.01	28.97	31	\N	2	2026-10-30 06:55:59.272+00	2026-10-15 13:31:34.688+00
\.


ALTER TABLE public.home_page ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_layout; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_layout DISABLE TRIGGER ALL;

COPY public.home_page_layout (_order, _parent_id, id, section, visible) FROM stdin;
1	1	6ad715cf113882bbdc526e8b	partners	t
2	1	6ad715cf113882bbdc526e8c	stats	t
3	1	6ad715cf113882bbdc526e8d	categories	t
4	1	6ad715cf113882bbdc526e8e	featured	t
5	1	6ad715cf113882bbdc526e8f	showcase	t
6	1	6ad715cf113882bbdc526e90	gallery	t
7	1	6ad715cf113882bbdc526e91	cta	t
\.


ALTER TABLE public.home_page_layout ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_locales DISABLE TRIGGER ALL;

COPY public.home_page_locales (hero_title, hero_subtitle, hub_name, categories_section_title, categories_section_subtitle, showcase_title, showcase_subtitle, gallery_title, partners_section_title, cta_title, cta_button_label, id, _locale, _parent_id, featured_section_title, featured_section_subtitle, meta_title, meta_description, meta_image_id) FROM stdin;
GÜVEN GALVANO KİMYASALLARI	Kaplama sektörünün küresel hammadde tedarikçisi	Türkiye	Ürün Gruplarımız	Hammadde	Stoktan hızlı tedarik	Geniş depo, güçlü lojistik	Tesisimiz	Çalıştığımız Firmalar	Teklif sepetinizi oluşturun	Ürünleri İncele	20	tr	1	Öne Çıkan Ürünler	Seçkiler	\N	\N	\N
GÜVEN GALVANO KİMYASALLARI	Global raw material supplier for the plating industry	Türkiye	Product Groups	Raw materials	Fast supply from stock	Large warehouse, strong logistics	Our Facility	Our Partners	Build your quote basket	Browse Products	21	en	1	Featured Products	Highlights	\N	\N	\N
\.


ALTER TABLE public.home_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_rels; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_rels DISABLE TRIGGER ALL;

COPY public.home_page_rels (id, "order", parent_id, path, media_id) FROM stdin;
53	1	1	gallery.images	30
54	2	1	gallery.images	31
55	3	1	gallery.images	32
56	4	1	gallery.images	33
57	5	1	gallery.images	34
58	6	1	gallery.images	35
\.


ALTER TABLE public.home_page_rels ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_routes; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_routes DISABLE TRIGGER ALL;

COPY public.home_page_routes (_order, _parent_id, id, direction, lat, lng) FROM stdin;
1	1	6ad0d5b6750a1f16844a0c0c	import	31.23	121.47
2	1	6ad0d5b6750a1f16844a0c0d	import	19.07	72.88
3	1	6ad0d5b6750a1f16844a0c0e	import	53.55	9.99
4	1	6ad0d5b6750a1f16844a0c0f	import	44.41	8.93
5	1	6ad0d5b6750a1f16844a0c10	import	51.22	4.4
6	1	6ad0d5b6750a1f16844a0c11	import	35.18	129.08
7	1	6ad0d5b6750a1f16844a0c12	export	40.41	49.87
8	1	6ad0d5b6750a1f16844a0c13	export	36.19	44.01
9	1	6ad0d5b6750a1f16844a0c14	export	30.04	31.24
10	1	6ad0d5b6750a1f16844a0c15	export	36.75	3.06
11	1	6ad0d5b6750a1f16844a0c16	export	44.43	26.1
12	1	6ad0d5b6750a1f16844a0c17	export	41.3	69.24
13	1	6ad0d5b6750a1f16844a0c18	export	24.71	46.68
14	1	6ad0d5b6750a1f16844a0c19	export	41.72	44.79
\.


ALTER TABLE public.home_page_routes ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_routes_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_routes_locales DISABLE TRIGGER ALL;

COPY public.home_page_routes_locales (label, id, _locale, _parent_id) FROM stdin;
Şanghay	267	tr	6ad0d5b6750a1f16844a0c0c
Shanghai	268	en	6ad0d5b6750a1f16844a0c0c
Mumbai	269	tr	6ad0d5b6750a1f16844a0c0d
Mumbai	270	en	6ad0d5b6750a1f16844a0c0d
Hamburg	271	tr	6ad0d5b6750a1f16844a0c0e
Hamburg	272	en	6ad0d5b6750a1f16844a0c0e
Cenova	273	tr	6ad0d5b6750a1f16844a0c0f
Genoa	274	en	6ad0d5b6750a1f16844a0c0f
Anvers	275	tr	6ad0d5b6750a1f16844a0c10
Antwerp	276	en	6ad0d5b6750a1f16844a0c10
Busan	277	tr	6ad0d5b6750a1f16844a0c11
Busan	278	en	6ad0d5b6750a1f16844a0c11
Bakü	279	tr	6ad0d5b6750a1f16844a0c12
Baku	280	en	6ad0d5b6750a1f16844a0c12
Erbil	281	tr	6ad0d5b6750a1f16844a0c13
Erbil	282	en	6ad0d5b6750a1f16844a0c13
Kahire	283	tr	6ad0d5b6750a1f16844a0c14
Cairo	284	en	6ad0d5b6750a1f16844a0c14
Cezayir	285	tr	6ad0d5b6750a1f16844a0c15
Algiers	286	en	6ad0d5b6750a1f16844a0c15
Bükreş	287	tr	6ad0d5b6750a1f16844a0c16
Bucharest	288	en	6ad0d5b6750a1f16844a0c16
Taşkent	289	tr	6ad0d5b6750a1f16844a0c17
Tashkent	290	en	6ad0d5b6750a1f16844a0c17
Riyad	291	tr	6ad0d5b6750a1f16844a0c18
Riyadh	292	en	6ad0d5b6750a1f16844a0c18
Tiflis	293	tr	6ad0d5b6750a1f16844a0c19
Tbilisi	294	en	6ad0d5b6750a1f16844a0c19
\.


ALTER TABLE public.home_page_routes_locales ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_slides; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_slides DISABLE TRIGGER ALL;

COPY public.home_page_slides (_order, _parent_id, id, image_id, video_id) FROM stdin;
1	1	6ad88085659e0c998c1d3dfe	30	\N
2	1	6ad0d5b6750a1f16844a0c09	1	\N
3	1	6ad0d5b6750a1f16844a0c0a	3	\N
4	1	6ad0d5b6750a1f16844a0c0b	4	\N
\.


ALTER TABLE public.home_page_slides ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_slides_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_slides_locales DISABLE TRIGGER ALL;

COPY public.home_page_slides_locales (caption, id, _locale, _parent_id) FROM stdin;
Çatalca Depomuz	61	tr	6ad88085659e0c998c1d3dfe
Our Çatalca warehouse	62	en	6ad88085659e0c998c1d3dfe
İthalat · İhracat	63	tr	6ad0d5b6750a1f16844a0c09
Import · Export	64	en	6ad0d5b6750a1f16844a0c09
Küresel lojistik	65	tr	6ad0d5b6750a1f16844a0c0a
Global logistics	66	en	6ad0d5b6750a1f16844a0c0a
Stoktan hızlı tedarik	67	tr	6ad0d5b6750a1f16844a0c0b
Fast supply from stock	68	en	6ad0d5b6750a1f16844a0c0b
\.


ALTER TABLE public.home_page_slides_locales ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_stats; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_stats DISABLE TRIGGER ALL;

COPY public.home_page_stats (_order, _parent_id, id, value, suffix) FROM stdin;
1	1	6ad0d5b6750a1f16844a0c1a	30	+
2	1	6ad0d5b6750a1f16844a0c1b	500	+
3	1	6ad0d5b6750a1f16844a0c1d	12000	 t
\.


ALTER TABLE public.home_page_stats ENABLE TRIGGER ALL;

--
-- Data for Name: home_page_stats_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.home_page_stats_locales DISABLE TRIGGER ALL;

COPY public.home_page_stats_locales (label, id, _locale, _parent_id) FROM stdin;
Ülke	69	tr	6ad0d5b6750a1f16844a0c1a
Countries	70	en	6ad0d5b6750a1f16844a0c1a
Ürün	71	tr	6ad0d5b6750a1f16844a0c1b
Products	72	en	6ad0d5b6750a1f16844a0c1b
Yıllık tedarik	73	tr	6ad0d5b6750a1f16844a0c1d
Annual supply	74	en	6ad0d5b6750a1f16844a0c1d
\.


ALTER TABLE public.home_page_stats_locales ENABLE TRIGGER ALL;

--
-- Data for Name: media_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.media_locales DISABLE TRIGGER ALL;

COPY public.media_locales (alt, id, _locale, _parent_id) FROM stdin;
Konteyner limanı	43	tr	1
Container port	44	en	1
Liman ve vinçler	45	tr	2
Port cranes	46	en	2
Konteyner gemisi	47	tr	3
Container ship	48	en	3
Depo	49	tr	4
Warehouse	50	en	4
Depo rafları	51	tr	5
Warehouse racks	52	en	5
Kimyasal variller	53	tr	6
Chemical drums	54	en	6
Variller	55	tr	7
Drums	56	en	7
Asit varilleri	57	tr	8
Acid drums	58	en	8
Bakır sülfat kristalleri	61	tr	10
Copper sulphate crystals	62	en	10
Metal kristalleri	63	tr	11
Metal crystals	64	en	11
IBC tanklar	65	tr	12
IBC containers	66	en	12
Toz kimyasal	67	tr	13
Powder chemical	68	en	13
Toz katkı	69	tr	14
Powder additive	70	en	14
Güven Galvano Kimyasalları logosu	72	tr	15
Güven Galvano Kimyasalları logo	73	en	15
Güven Galvano Kimyasalları logosu (koyu zemin)	75	tr	16
Güven Galvano Kimyasalları logo (dark)	76	en	16
Nordic Metals logosu	78	tr	18
Rhein Chemie Handel logosu	79	tr	19
Shanghai Plating Materials logosu	80	tr	20
Mumbai Salts Ltd. logosu	81	tr	21
Liguria Chimica logosu	82	tr	22
Busan Zinc Co. logosu	83	tr	23
Anadolu Kaplama logosu	84	tr	24
Marmara Galvaniz logosu	85	tr	25
Bakü Metal Coating logosu	86	tr	26
Erbil Surface Tech logosu	87	tr	27
Cairo Electroplating logosu	88	tr	28
Tashkent Coating logosu	89	tr	29
Nikel tuzu kristalleri	96	tr	9
Nickel salt crystals	97	en	9
Çatalca deposunda raflı kimyasal stok alanı	100	tr	30
Racked chemical stock at our Çatalca warehouse	101	en	30
Çatalca deposunda forklift ve paletli kimyasallar	104	tr	31
Forklift and palletised chemicals at the Çatalca warehouse	105	en	31
Çatalca deposu önünde IBC tanklar	108	tr	32
IBC tanks in front of the Çatalca warehouse	109	en	32
Konteynerde paletli kostik soda çuvalları	112	tr	33
Palletised caustic soda bags in a container	113	en	33
Treylere yüklenmiş krom trioksit varilleri	116	tr	34
Chromium trioxide drums loaded on a trailer	117	en	34
Çinko klorür torbaları	120	tr	35
Zinc chloride bags	121	en	35
25 kg çinko klorür torbası	124	tr	36
25 kg zinc chloride bag	125	en	36
25 kg amonyum klorür torbası	128	tr	37
25 kg ammonium chloride bag	129	en	37
25 kg baryum klorür dihidrat torbası	132	tr	38
25 kg barium chloride dihydrate bag	133	en	38
25 kg sodyum nitrat torbası	136	tr	39
25 kg sodium nitrate bag	137	en	39
25 kg bakır sülfat pentahidrat torbası	140	tr	40
25 kg copper sulphate pentahydrate bag	141	en	40
50 kg sodyum siyanür varili	144	tr	41
50 kg sodium cyanide drum	145	en	41
Sodyum siyanür fıçısı	148	tr	42
Sodium cyanide drum	149	en	42
Sodyum hidroksit (kostik soda) mikroinci çuvalı	152	tr	43
Sodium hydroxide (caustic soda) micropearls bag	153	en	43
25 kg kostik soda çuvalı	156	tr	44
25 kg caustic soda bag	157	en	44
Kromik asit (krom trioksit) varili	160	tr	45
Chromic acid (chromium trioxide) drum	161	en	45
Kromik asit varili tehlike etiketleri	164	tr	46
Chromic acid drum hazard labels	165	en	46
Mavi kimyasal varil	168	tr	47
Blue chemical drum	169	en	47
25 kg potasyum hidroksit torbası	172	tr	48
25 kg potassium hydroxide bag	173	en	48
25 kg potasyum klorür torbası	176	tr	49
25 kg potassium chloride bag	177	en	49
50 kg potasyum siyanür varili	180	tr	50
50 kg potassium cyanide drum	181	en	50
25 kg sodyum bikromat torbası	184	tr	51
25 kg sodium dichromate bag	185	en	51
25 kg sodyum metabisülfit torbası	188	tr	52
25 kg sodium metabisulphite bag	189	en	52
Hidrojen peroksit varili	192	tr	53
Hydrogen peroxide drum	193	en	53
165 kg izopropil alkol varili	196	tr	54
165 kg isopropyl alcohol drum	197	en	54
\.


ALTER TABLE public.media_locales ENABLE TRIGGER ALL;

--
-- Data for Name: partners_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.partners_locales DISABLE TRIGGER ALL;

COPY public.partners_locales (country, id, _locale, _parent_id) FROM stdin;
Finlandiya	37	tr	1
Finland	38	en	1
Almanya	39	tr	2
Germany	40	en	2
Çin	41	tr	3
China	42	en	3
Hindistan	43	tr	4
India	44	en	4
İtalya	45	tr	5
Italy	46	en	5
Güney Kore	47	tr	6
South Korea	48	en	6
Türkiye	49	tr	7
Türkiye	50	en	7
Türkiye	51	tr	8
Türkiye	52	en	8
Azerbaycan	53	tr	9
Azerbaijan	54	en	9
Irak	55	tr	10
Iraq	56	en	10
Mısır	57	tr	11
Egypt	58	en	11
Özbekistan	59	tr	12
Uzbekistan	60	en	12
\.


ALTER TABLE public.partners_locales ENABLE TRIGGER ALL;

--
-- Data for Name: partners_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.partners_page DISABLE TRIGGER ALL;

COPY public.partners_page (id, hero_image_id, updated_at, created_at) FROM stdin;
1	3	2026-10-15 13:31:35.999+00	2026-10-15 13:31:35.984+00
\.


ALTER TABLE public.partners_page ENABLE TRIGGER ALL;

--
-- Data for Name: partners_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.partners_page_locales DISABLE TRIGGER ALL;

COPY public.partners_page_locales (hero_title, hero_subtitle, id, _locale, _parent_id, meta_title, meta_description, meta_image_id) FROM stdin;
Çalıştığımız Firmalar	Tedarikçilerimiz ve müşterilerimiz	2	tr	1	\N	\N	\N
Our Partners	Our suppliers and customers	3	en	1	\N	\N	\N
\.


ALTER TABLE public.partners_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: privacy_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.privacy_page DISABLE TRIGGER ALL;

COPY public.privacy_page (id, last_updated, updated_at, created_at) FROM stdin;
1	2026-10-16 06:23:07.982+00	2026-10-16 06:23:08.472+00	2026-10-16 06:23:08.413+00
\.


ALTER TABLE public.privacy_page ENABLE TRIGGER ALL;

--
-- Data for Name: privacy_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.privacy_page_locales DISABLE TRIGGER ALL;

COPY public.privacy_page_locales (title, content, id, _locale, _parent_id, meta_title, meta_description, meta_image_id) FROM stdin;
KVKK Aydınlatma Metni ve Gizlilik Politikası	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bu metin örnek bir şablondur. Yayından önce hukuk danışmanınızın onayladığı metinle değiştirin.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Veri Sorumlusu", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "6698 sayılı Kişisel Verilerin Korunması Kanunu (\\"KVKK\\") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla Güven Galvano Kimyasalları tarafından aşağıda açıklanan kapsamda işlenmektedir.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşlenen Kişisel Veriler", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Kimlik ve iletişim bilgileri: ad soyad, firma adı, e-posta, telefon, ülke/şehir", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Talep bilgileri: teklif sepetindeki ürünler, miktarlar ve mesajınız", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşlem güvenliği bilgileri: IP adresi ve istek zamanı", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "İşleme Amaçları ve Hukuki Sebep", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Verileriniz; teklif ve iletişim taleplerinize yanıt verilmesi, ticari ilişkinin kurulması ve kötüye kullanımın önlenmesi amaçlarıyla, KVKK m.5/2 (c) ve (f) bentlerine dayanılarak işlenir. Talepler web sitesinde saklanmaz; yalnızca yetkili satış ekibine e-posta ile iletilir.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Aktarım", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Verileriniz, e-posta hizmet sağlayıcıları ve yasal yükümlülükler kapsamında yetkili kamu kurumları dışında üçüncü kişilere aktarılmaz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Haklarınız", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "KVKK m.11 kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Başvurularınızı İletişim sayfasındaki adreslere iletebilirsiniz.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	2	tr	1	\N	\N	\N
Privacy Notice	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "This is a sample template. Replace it with the text approved by your legal advisor before going live.", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Data Controller", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Under the Turkish Personal Data Protection Law No. 6698 (\\"KVKK\\"), your personal data is processed by Güven Galvano Kimyasalları as data controller, as described below.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Data We Process", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Identity and contact details: name, company, e-mail, phone, country/city", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Request details: products and quantities in your quote basket and your message", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Security data: IP address and request time", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Purposes and Legal Basis", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Your data is processed to respond to your quote and contact requests, to establish a business relationship and to prevent abuse. Requests are not stored on the website; they are only e-mailed to our authorised sales team.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Transfers", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Your data is not shared with third parties other than e-mail service providers and competent authorities where legally required.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Your Rights", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Under Article 11 of KVKK you may ask whether your data is processed, request its correction or deletion, and object to processing. Please use the addresses on our Contact page.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textFormat": 0}], "direction": "ltr"}}	3	en	1	\N	\N	\N
\.


ALTER TABLE public.privacy_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: processes_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.processes_locales DISABLE TRIGGER ALL;

COPY public.processes_locales (name, id, _locale, _parent_id) FROM stdin;
Akımsız Nikel	2	tr	1
Electroless Nickel	3	en	1
Altın Kaplama	5	tr	2
Gold Plating	6	en	2
Bakır Kaplama	8	tr	3
Copper Plating	9	en	3
Çinko Kaplama	11	tr	4
Zinc Plating	12	en	4
Çinko-Demir Kaplama	14	tr	5
Zinc-Iron Plating	15	en	5
Fosfat Kaplama	17	tr	6
Phosphating	18	en	6
Kalay Kaplama	20	tr	7
Tin Plating	21	en	7
Krom Kaplama	23	tr	8
Chrome Plating	24	en	8
Lak & Sökücüler	26	tr	9
Lacquers & Strippers	27	en	9
Nikel Kaplama	29	tr	10
Nickel Plating	30	en	10
Pasivasyon	32	tr	11
Passivation	33	en	11
Pirinç & Dekoratif	35	tr	12
Brass & Decorative	36	en	12
Yağ Alma & Ön İşlem	38	tr	13
Degreasing & Pre-treatment	39	en	13
\.


ALTER TABLE public.processes_locales ENABLE TRIGGER ALL;

--
-- Data for Name: processes_texts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.processes_texts DISABLE TRIGGER ALL;

COPY public.processes_texts (id, "order", parent_id, path, text) FROM stdin;
\.


ALTER TABLE public.processes_texts ENABLE TRIGGER ALL;

--
-- Data for Name: product_categories_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.product_categories_locales DISABLE TRIGGER ALL;

COPY public.product_categories_locales (name, summary, id, _locale, _parent_id, meta_title, meta_description, meta_image_id) FROM stdin;
Anot Malzemeleri	Akım altında çalışan banyolarda çözülerek metale kaplanan anot çeşitleri.	29	tr	3	\N	\N	\N
Anode Materials	Anodes that dissolve in electrolytic baths and deposit onto the part.	30	en	3	\N	\N	\N
Parlatıcı & Katkılar	Banyonun çalışmasını ve kaplama kalitesini destekleyen toz ve sıvı katkılar.	33	tr	4	\N	\N	\N
Brighteners & Additives	Powder and liquid additives supporting bath performance and deposit quality.	34	en	4	\N	\N	\N
Metal Tuzları	Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.	47	tr	1	\N	\N	\N
Metal Salts	Nickel, copper, zinc and cobalt salts — the metal source of plating baths.	48	en	1	\N	\N	\N
Asitler & Bazlar	Banyo hazırlama, pH ayarı, dekapaj ve yağ almada kullanılan asit ve bazlar.	49	tr	2	\N	\N	\N
Acids & Bases	Acids and bases for bath make-up, pH control, pickling and degreasing.	50	en	2	\N	\N	\N
Pasivasyon	Kaplama sonrası korozyon direnci sağlayan pasivasyon hammaddeleri.	51	tr	5	\N	\N	\N
Passivation	Raw materials for post-plating passivation and corrosion resistance.	52	en	5	\N	\N	\N
Dökme & IBC Tedarik	Varil, IBC ve tanker ile dökme kimyasal tedariki.	53	tr	6	\N	\N	\N
Bulk & IBC Supply	Bulk chemical supply in drums, IBCs and tankers.	54	en	6	\N	\N	\N
\.


ALTER TABLE public.product_categories_locales ENABLE TRIGGER ALL;

--
-- Data for Name: product_categories_texts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.product_categories_texts DISABLE TRIGGER ALL;

COPY public.product_categories_texts (id, "order", parent_id, path, text) FROM stdin;
\.


ALTER TABLE public.product_categories_texts ENABLE TRIGGER ALL;

--
-- Data for Name: products_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_locales DISABLE TRIGGER ALL;

COPY public.products_locales (name, summary, description, origin, id, _locale, _parent_id, meta_title, meta_description, meta_image_id) FROM stdin;
Nikel Klorür	Watts nikel banyoları için.	\N	Çin	51	tr	2	\N	\N	\N
Nickel Chloride	For Watts nickel baths.	\N	China	52	en	2	\N	\N	\N
Borik Asit	Nikel banyolarında tampon madde.	\N	Türkiye	57	tr	5	\N	\N	\N
Boric Acid	Buffer agent for nickel baths.	\N	Türkiye	58	en	5	\N	\N	\N
Sülfürik Asit	Dekapaj ve banyo hazırlığı.	\N	Türkiye	59	tr	6	\N	\N	\N
Sulphuric Acid	Pickling and bath make-up.	\N	Türkiye	60	en	6	\N	\N	\N
Nikel Anot	Pul ve plaka formunda nikel anot.	\N	Kanada	63	tr	8	\N	\N	\N
Nickel Anode	Nickel anodes in pellet and plate form.	\N	Canada	64	en	8	\N	\N	\N
Fosforlu Bakır Anot	Asidik bakır kaplama için.	\N	Almanya	65	tr	9	\N	\N	\N
Phosphorised Copper Anode	For acid copper plating.	\N	Germany	66	en	9	\N	\N	\N
Çinko Anot	Yüksek saflıkta çinko bilye ve plaka.	\N	Güney Kore	67	tr	10	\N	\N	\N
Zinc Anode	High-purity zinc balls and plates.	\N	South Korea	68	en	10	\N	\N	\N
Sakarin Sodyum	Nikel banyolarında birincil parlatıcı hammaddesi.	\N	Çin	69	tr	11	\N	\N	\N
Sodium Saccharin	Primary brightener raw material for nickel.	\N	China	70	en	11	\N	\N	\N
Krom (III) Klorür	Trivalent pasivasyon hammaddesi.	\N	Hindistan	71	tr	12	\N	\N	\N
Chromium (III) Chloride	Raw material for trivalent passivation.	\N	India	72	en	12	\N	\N	\N
Kobalt Sülfat	Pasivasyon ve alaşım banyoları için.	\N	Belçika	73	tr	13	\N	\N	\N
Cobalt Sulphate	For passivation and alloy baths.	\N	Belgium	74	en	13	\N	\N	\N
Nikel Sülfat	Nikel kaplama banyolarının ana hammaddesi.	\N	Finlandiya	79	tr	1	\N	\N	\N
Nickel Sulphate	Primary raw material for nickel plating baths.	\N	Finland	80	en	1	\N	\N	\N
Bakır Sülfat	Asidik bakır banyoları için mavi kristal.	\N	Almanya	81	tr	3	\N	\N	\N
Copper Sulphate	Blue crystals for acid copper baths.	\N	Germany	82	en	3	\N	\N	\N
Çinko Klorür	Asidik çinko banyoları için.	\N	Hindistan	83	tr	4	\N	\N	\N
Zinc Chloride	For acid zinc baths.	\N	India	84	en	4	\N	\N	\N
Kostik Soda	Alkali çinko ve yağ alma banyoları.	\N	İtalya	85	tr	7	\N	\N	\N
Caustic Soda	Alkaline zinc and degreasing baths.	\N	Italy	86	en	7	\N	\N	\N
Dökme Kimyasal Sevkiyat	IBC ve tanker ile dökme tedarik.	\N	Çoklu	87	tr	14	\N	\N	\N
Bulk Chemical Shipment	Bulk supply in IBC and tankers.	\N	Multiple	88	en	14	\N	\N	\N
Amonyum Klorür	Asidik çinko banyolarında iletkenlik tuzu olarak kullanılır. 25 kg torba.	\N	\N	90	tr	15	\N	\N	\N
Ammonium Chloride	Conductivity salt for acid zinc baths. 25 kg bags.	\N	\N	91	en	15	\N	\N	\N
Baryum Klorür Dihidrat	Krom banyolarında sülfat dengesinin ayarlanmasında kullanılır. 25 kg torba.	\N	\N	93	tr	16	\N	\N	\N
Barium Chloride Dihydrate	Used to adjust sulphate levels in chrome baths. 25 kg bags.	\N	\N	94	en	16	\N	\N	\N
Sodyum Nitrat	Fosfat ve karartma banyolarında oksitleyici katkı. 25 kg torba.	\N	\N	96	tr	17	\N	\N	\N
Sodium Nitrate	Oxidising additive for phosphating and blackening baths. 25 kg bags.	\N	\N	97	en	17	\N	\N	\N
Sodyum Siyanür	Siyanürlü bakır ve çinko banyoları için. 50 kg varil.	\N	\N	99	tr	18	\N	\N	\N
Sodium Cyanide	For cyanide copper and zinc baths. 50 kg drums.	\N	\N	100	en	18	\N	\N	\N
Potasyum Siyanür	Siyanürlü altın ve bakır banyoları için. 50 kg varil.	\N	\N	102	tr	19	\N	\N	\N
Potassium Cyanide	For cyanide gold and copper baths. 50 kg drums.	\N	\N	103	en	19	\N	\N	\N
Kromik Asit (Krom Trioksit)	Sert ve dekoratif krom banyolarının ana hammaddesi. Varil ambalaj.	\N	\N	105	tr	20	\N	\N	\N
Chromic Acid (Chromium Trioxide)	The main raw material of hard and decorative chrome baths. Drums.	\N	\N	106	en	20	\N	\N	\N
Potasyum Hidroksit	Alkali yağ alma ve pH ayarında kullanılır. 25 kg torba.	\N	\N	108	tr	21	\N	\N	\N
Potassium Hydroxide	Used in alkaline degreasing and pH adjustment. 25 kg bags.	\N	\N	109	en	21	\N	\N	\N
Potasyum Klorür	Klorürlü (asidik) çinko banyolarının temel tuzu. 25 kg torba.	\N	\N	111	tr	22	\N	\N	\N
Potassium Chloride	Base salt of chloride (acid) zinc baths. 25 kg bags.	\N	\N	112	en	22	\N	\N	\N
Sodyum Bikromat	Kromat pasivasyon ve yüzey işlemlerinde kullanılır. 25 kg torba.	\N	\N	114	tr	23	\N	\N	\N
Sodium Dichromate	Used in chromate passivation and surface treatment. 25 kg bags.	\N	\N	115	en	23	\N	\N	\N
Sodyum Metabisülfit	İndirgeyici; krom (VI) indirgeme ve atık su arıtımında kullanılır. 25 kg torba.	\N	\N	117	tr	24	\N	\N	\N
Sodium Metabisulphite	Reducing agent for chromium (VI) reduction and wastewater treatment. 25 kg bags.	\N	\N	118	en	24	\N	\N	\N
Hidrojen Peroksit	Banyo arıtma ve yüzey hazırlamada oksitleyici olarak kullanılır. Varil.	\N	\N	120	tr	25	\N	\N	\N
Hydrogen Peroxide	Oxidiser for bath purification and surface preparation. Drums.	\N	\N	121	en	25	\N	\N	\N
İzopropil Alkol	Yüzey temizleme ve kurutmada kullanılan çözücü. 165 kg varil.	\N	\N	123	tr	26	\N	\N	\N
Isopropyl Alcohol	Solvent for surface cleaning and drying. 165 kg drums.	\N	\N	124	en	26	\N	\N	\N
\.


ALTER TABLE public.products_locales ENABLE TRIGGER ALL;

--
-- Data for Name: products_packaging; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_packaging DISABLE TRIGGER ALL;

COPY public.products_packaging (_order, _parent_id, id) FROM stdin;
1	2	6ad0d5b5750a1f16844a0be7
1	5	6ad0d5b5750a1f16844a0bf1
2	5	6ad0d5b5750a1f16844a0bf2
1	6	6ad0d5b5750a1f16844a0bf5
2	6	6ad0d5b5750a1f16844a0bf6
1	8	6ad0d5b5750a1f16844a0bfc
1	9	6ad0d5b5750a1f16844a0bfe
1	10	6ad0d5b5750a1f16844a0c00
1	11	6ad0d5b5750a1f16844a0c02
1	12	6ad0d5b5750a1f16844a0c04
1	13	6ad0d5b5750a1f16844a0c06
1	1	6ad0d5b5750a1f16844a0be3
2	1	6ad0d5b5750a1f16844a0be4
1	3	6ad0d5b5750a1f16844a0bea
2	3	6ad0d5b5750a1f16844a0beb
1	4	6ad0d5b5750a1f16844a0bee
1	7	6ad0d5b5750a1f16844a0bf9
1	14	6ad0d5b6750a1f16844a0c07
2	14	6ad0d5b6750a1f16844a0c08
\.


ALTER TABLE public.products_packaging ENABLE TRIGGER ALL;

--
-- Data for Name: products_packaging_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_packaging_locales DISABLE TRIGGER ALL;

COPY public.products_packaging_locales (label, id, _locale, _parent_id) FROM stdin;
25 kg torba	110	tr	6ad0d5b5750a1f16844a0be3
25 kg bag	111	en	6ad0d5b5750a1f16844a0be3
1000 kg big bag	112	tr	6ad0d5b5750a1f16844a0be4
1000 kg big bag	113	en	6ad0d5b5750a1f16844a0be4
25 kg torba	114	tr	6ad0d5b5750a1f16844a0bea
25 kg bag	115	en	6ad0d5b5750a1f16844a0bea
1000 kg big bag	116	tr	6ad0d5b5750a1f16844a0beb
1000 kg big bag	117	en	6ad0d5b5750a1f16844a0beb
25 kg torba	118	tr	6ad0d5b5750a1f16844a0bee
25 kg bag	119	en	6ad0d5b5750a1f16844a0bee
25 kg torba	120	tr	6ad0d5b5750a1f16844a0bf9
25 kg bag	121	en	6ad0d5b5750a1f16844a0bf9
1000 lt IBC	122	tr	6ad0d5b6750a1f16844a0c07
1000 L IBC	123	en	6ad0d5b6750a1f16844a0c07
Tanker	124	tr	6ad0d5b6750a1f16844a0c08
Tanker	125	en	6ad0d5b6750a1f16844a0c08
25 kg torba	72	tr	6ad0d5b5750a1f16844a0be7
25 kg bag	73	en	6ad0d5b5750a1f16844a0be7
25 kg torba	80	tr	6ad0d5b5750a1f16844a0bf1
25 kg bag	81	en	6ad0d5b5750a1f16844a0bf1
1000 kg big bag	82	tr	6ad0d5b5750a1f16844a0bf2
1000 kg big bag	83	en	6ad0d5b5750a1f16844a0bf2
200 lt varil	84	tr	6ad0d5b5750a1f16844a0bf5
200 L drum	85	en	6ad0d5b5750a1f16844a0bf5
1000 lt IBC	86	tr	6ad0d5b5750a1f16844a0bf6
1000 L IBC	87	en	6ad0d5b5750a1f16844a0bf6
50 kg kasa	90	tr	6ad0d5b5750a1f16844a0bfc
50 kg case	91	en	6ad0d5b5750a1f16844a0bfc
Kasa	92	tr	6ad0d5b5750a1f16844a0bfe
Case	93	en	6ad0d5b5750a1f16844a0bfe
1 ton palet	94	tr	6ad0d5b5750a1f16844a0c00
1 t pallet	95	en	6ad0d5b5750a1f16844a0c00
25 kg torba	96	tr	6ad0d5b5750a1f16844a0c02
25 kg bag	97	en	6ad0d5b5750a1f16844a0c02
25 kg torba	98	tr	6ad0d5b5750a1f16844a0c04
25 kg bag	99	en	6ad0d5b5750a1f16844a0c04
25 kg torba	100	tr	6ad0d5b5750a1f16844a0c06
25 kg bag	101	en	6ad0d5b5750a1f16844a0c06
\.


ALTER TABLE public.products_packaging_locales ENABLE TRIGGER ALL;

--
-- Data for Name: products_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_page DISABLE TRIGGER ALL;

COPY public.products_page (id, hero_image_id, updated_at, created_at) FROM stdin;
1	6	2026-10-16 06:39:30.153+00	2026-10-15 13:31:35.949+00
\.


ALTER TABLE public.products_page ENABLE TRIGGER ALL;

--
-- Data for Name: products_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_page_locales DISABLE TRIGGER ALL;

COPY public.products_page_locales (hero_title, hero_subtitle, id, _locale, _parent_id, catalog_title, catalog_description, meta_title, meta_description, meta_image_id) FROM stdin;
Ürünlerimiz	Kaplama sektörü için hammaddeler	6	tr	1	Ürün Kataloğu	Tedarik ettiğimiz ürünleri gruplara ve kullanıldıkları proseslere göre listeledik. Teknik belgeler için bize ulaşın.	\N	\N	\N
Products	Raw materials for the plating industry	7	en	1	Product Catalogue	Our products listed by group and by the processes they are used in. Contact us for technical documents.	\N	\N	\N
\.


ALTER TABLE public.products_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: products_rels; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_rels DISABLE TRIGGER ALL;

COPY public.products_rels (id, "order", parent_id, path, media_id, processes_id) FROM stdin;
114	1	1	processes	\N	10
115	2	1	processes	\N	1
116	1	1	gallery	6	\N
117	2	1	gallery	5	\N
118	1	3	processes	\N	3
119	2	3	processes	\N	12
120	1	4	processes	\N	4
121	2	4	processes	\N	5
122	1	4	gallery	35	\N
123	1	7	processes	\N	4
124	2	7	processes	\N	13
125	1	7	gallery	43	\N
126	2	7	gallery	33	\N
128	1	15	processes	\N	4
130	1	16	processes	\N	8
132	1	17	processes	\N	6
136	1	18	processes	\N	3
137	2	18	processes	\N	4
138	1	18	gallery	42	\N
141	1	19	processes	\N	2
142	2	19	processes	\N	3
146	1	20	processes	\N	8
147	1	20	gallery	46	\N
148	2	20	gallery	34	\N
150	1	21	processes	\N	13
152	1	22	processes	\N	4
154	1	23	processes	\N	11
156	1	26	processes	\N	13
67	1	2	processes	\N	10
68	1	2	gallery	6	\N
69	2	2	gallery	5	\N
78	1	5	processes	\N	10
79	1	5	gallery	6	\N
80	2	5	gallery	5	\N
81	1	6	processes	\N	3
82	2	6	processes	\N	13
83	1	6	gallery	6	\N
84	2	6	gallery	5	\N
89	1	8	processes	\N	10
90	1	8	gallery	6	\N
91	2	8	gallery	5	\N
92	1	9	processes	\N	3
93	1	9	gallery	6	\N
94	2	9	gallery	5	\N
95	1	10	processes	\N	4
96	1	10	gallery	6	\N
97	2	10	gallery	5	\N
98	1	11	processes	\N	10
99	1	11	gallery	6	\N
100	2	11	gallery	5	\N
101	1	12	processes	\N	8
102	2	12	processes	\N	11
103	1	12	gallery	6	\N
104	2	12	gallery	5	\N
105	1	13	processes	\N	11
106	1	13	gallery	6	\N
107	2	13	gallery	5	\N
\.


ALTER TABLE public.products_rels ENABLE TRIGGER ALL;

--
-- Data for Name: products_specs; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_specs DISABLE TRIGGER ALL;

COPY public.products_specs (_order, _parent_id, id) FROM stdin;
1	3	6ad0d5b5750a1f16844a0be9
1	4	6ad0d5b5750a1f16844a0bed
1	7	6ad0d5b5750a1f16844a0bf8
1	2	6ad0d5b5750a1f16844a0be6
1	5	6ad0d5b5750a1f16844a0bf0
1	6	6ad0d5b5750a1f16844a0bf4
1	8	6ad0d5b5750a1f16844a0bfa
2	8	6ad0d5b5750a1f16844a0bfb
1	9	6ad0d5b5750a1f16844a0bfd
1	10	6ad0d5b5750a1f16844a0bff
1	1	6ad0d5b5750a1f16844a0be1
2	1	6ad0d5b5750a1f16844a0be2
\.


ALTER TABLE public.products_specs ENABLE TRIGGER ALL;

--
-- Data for Name: products_specs_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_specs_locales DISABLE TRIGGER ALL;

COPY public.products_specs_locales (label, value, id, _locale, _parent_id) FROM stdin;
Saflık	≥ %22 Ni	109	tr	6ad0d5b5750a1f16844a0be1
Purity	≥ %22 Ni	110	en	6ad0d5b5750a1f16844a0be1
Görünüm	Yeşil kristal	111	tr	6ad0d5b5750a1f16844a0be2
Appearance	Yeşil kristal	112	en	6ad0d5b5750a1f16844a0be2
Saflık	≥ %25 Cu	113	tr	6ad0d5b5750a1f16844a0be9
Purity	≥ %25 Cu	114	en	6ad0d5b5750a1f16844a0be9
Saflık	≥ %98	115	tr	6ad0d5b5750a1f16844a0bed
Purity	≥ %98	116	en	6ad0d5b5750a1f16844a0bed
Görünüm	Pul / Flake	117	tr	6ad0d5b5750a1f16844a0bf8
Appearance	Pul / Flake	118	en	6ad0d5b5750a1f16844a0bf8
Saflık	≥ %24 Ni	85	tr	6ad0d5b5750a1f16844a0be6
Purity	≥ %24 Ni	86	en	6ad0d5b5750a1f16844a0be6
Saflık	≥ %99.9	91	tr	6ad0d5b5750a1f16844a0bf0
Purity	≥ %99.9	92	en	6ad0d5b5750a1f16844a0bf0
Saflık	%98	93	tr	6ad0d5b5750a1f16844a0bf4
Purity	%98	94	en	6ad0d5b5750a1f16844a0bf4
Saflık	≥ %99.9 Ni	97	tr	6ad0d5b5750a1f16844a0bfa
Purity	≥ %99.9 Ni	98	en	6ad0d5b5750a1f16844a0bfa
Görünüm	Pellet / Plaka	99	tr	6ad0d5b5750a1f16844a0bfb
Appearance	Pellet / Plaka	100	en	6ad0d5b5750a1f16844a0bfb
Saflık	P: %0.04–0.06	101	tr	6ad0d5b5750a1f16844a0bfd
Purity	P: %0.04–0.06	102	en	6ad0d5b5750a1f16844a0bfd
Saflık	≥ %99.995 Zn	103	tr	6ad0d5b5750a1f16844a0bff
Purity	≥ %99.995 Zn	104	en	6ad0d5b5750a1f16844a0bff
\.


ALTER TABLE public.products_specs_locales ENABLE TRIGGER ALL;

--
-- Data for Name: products_texts; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.products_texts DISABLE TRIGGER ALL;

COPY public.products_texts (id, "order", parent_id, path, text) FROM stdin;
\.


ALTER TABLE public.products_texts ENABLE TRIGGER ALL;

--
-- Data for Name: quote_page; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.quote_page DISABLE TRIGGER ALL;

COPY public.quote_page (id, hero_image_id, updated_at, created_at) FROM stdin;
1	5	2026-10-15 13:31:36.058+00	2026-10-15 13:31:36.044+00
\.


ALTER TABLE public.quote_page ENABLE TRIGGER ALL;

--
-- Data for Name: quote_page_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.quote_page_locales DISABLE TRIGGER ALL;

COPY public.quote_page_locales (hero_title, hero_subtitle, success_message, id, _locale, _parent_id) FROM stdin;
Teklif Sepeti	Ürünleri seçin, miktarları girin, gönderin.	Teklif talebiniz ekibimize iletildi. En kısa sürede dönüş yapacağız.	2	tr	1
Quote Basket	Pick products, set quantities, send.	Your request has been sent to our team. We will get back to you shortly.	3	en	1
\.


ALTER TABLE public.quote_page_locales ENABLE TRIGGER ALL;

--
-- Data for Name: redirects; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.redirects DISABLE TRIGGER ALL;

COPY public.redirects (id, "from", "to", type, note, updated_at, created_at) FROM stdin;
\.


ALTER TABLE public.redirects ENABLE TRIGGER ALL;

--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.site_settings DISABLE TRIGGER ALL;

COPY public.site_settings (id, site_name, logo_id, logo_light_id, map_lat, map_lng, updated_at, created_at, whatsapp_number, legal_name, fax) FROM stdin;
1	Güven Galvano Kimyasalları	15	16	41.0838	28.7868	2026-10-30 06:56:55.265+00	2026-10-15 13:31:36.076+00	+90 262 000 00 00	Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.	+90 212 485 88 27
\.


ALTER TABLE public.site_settings ENABLE TRIGGER ALL;

--
-- Data for Name: site_settings_emails; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.site_settings_emails DISABLE TRIGGER ALL;

COPY public.site_settings_emails (_order, _parent_id, id, email) FROM stdin;
1	1	6ae43fb798e1cd8b58530eae	info@guvengalvanokimya.com
\.


ALTER TABLE public.site_settings_emails ENABLE TRIGGER ALL;

--
-- Data for Name: site_settings_locales; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.site_settings_locales DISABLE TRIGGER ALL;

COPY public.site_settings_locales (tagline, footer_note, address, id, _locale, _parent_id, whatsapp_message) FROM stdin;
Kaplama sektörünün küresel hammadde tedarikçisi	Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.	İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye	24	tr	1	Merhaba, ürünleriniz hakkında bilgi almak istiyorum.
Global raw material supplier for the plating industry	Import, export and supply of raw materials for the plating industry.	İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye	25	en	1	Hello, I would like to get information about your products.
\.


ALTER TABLE public.site_settings_locales ENABLE TRIGGER ALL;

--
-- Data for Name: site_settings_phones; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.site_settings_phones DISABLE TRIGGER ALL;

COPY public.site_settings_phones (_order, _parent_id, id, number) FROM stdin;
1	1	6ae43fb798e1cd8b58530eac	+90 212 485 88 25
2	1	6ae43fb798e1cd8b58530ead	+90 212 485 88 26
\.


ALTER TABLE public.site_settings_phones ENABLE TRIGGER ALL;

--
-- Data for Name: site_settings_quote_recipients; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.site_settings_quote_recipients DISABLE TRIGGER ALL;

COPY public.site_settings_quote_recipients (_order, _parent_id, id, email) FROM stdin;
1	1	6ae43f7fb95733a7c8a4bcb3	info@guvengalvanokimya.com
\.


ALTER TABLE public.site_settings_quote_recipients ENABLE TRIGGER ALL;

--
-- Data for Name: site_settings_socials; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.site_settings_socials DISABLE TRIGGER ALL;

COPY public.site_settings_socials (_order, _parent_id, id, platform, url) FROM stdin;
1	1	6ad0d5b8750a1f16844a0c2b	linkedin	https://www.linkedin.com
2	1	6ad0d5b8750a1f16844a0c2c	instagram	https://www.instagram.com
\.


ALTER TABLE public.site_settings_socials ENABLE TRIGGER ALL;

--
-- Name: _about_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_id_seq', 6, true);


--
-- Name: _about_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_locales_id_seq', 12, true);


--
-- Name: _about_page_v_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_rels_id_seq', 36, true);


--
-- Name: _about_page_v_version_company_facts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_company_facts_id_seq', 27, true);


--
-- Name: _about_page_v_version_company_facts_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_company_facts_locales_id_seq', 48, true);


--
-- Name: _about_page_v_version_sectors_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_sectors_items_id_seq', 45, true);


--
-- Name: _about_page_v_version_sectors_items_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_sectors_items_locales_id_seq', 81, true);


--
-- Name: _about_page_v_version_services_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_services_items_id_seq', 20, true);


--
-- Name: _about_page_v_version_services_items_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_services_items_locales_id_seq', 36, true);


--
-- Name: _about_page_v_version_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_stats_id_seq', 20, true);


--
-- Name: _about_page_v_version_stats_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_stats_locales_id_seq', 36, true);


--
-- Name: _about_page_v_version_story_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_story_id_seq', 18, true);


--
-- Name: _about_page_v_version_story_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_story_locales_id_seq', 33, true);


--
-- Name: _about_page_v_version_timeline_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_timeline_id_seq', 12, true);


--
-- Name: _about_page_v_version_timeline_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_timeline_locales_id_seq', 24, true);


--
-- Name: _about_page_v_version_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_values_id_seq', 24, true);


--
-- Name: _about_page_v_version_values_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._about_page_v_version_values_locales_id_seq', 44, true);


--
-- Name: _contact_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._contact_page_v_id_seq', 1, false);


--
-- Name: _contact_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._contact_page_v_locales_id_seq', 1, false);


--
-- Name: _home_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_id_seq', 7, true);


--
-- Name: _home_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_locales_id_seq', 14, true);


--
-- Name: _home_page_v_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_rels_id_seq', 38, true);


--
-- Name: _home_page_v_version_layout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_layout_id_seq', 28, true);


--
-- Name: _home_page_v_version_routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_routes_id_seq', 98, true);


--
-- Name: _home_page_v_version_routes_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_routes_locales_id_seq', 196, true);


--
-- Name: _home_page_v_version_slides_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_slides_id_seq', 24, true);


--
-- Name: _home_page_v_version_slides_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_slides_locales_id_seq', 47, true);


--
-- Name: _home_page_v_version_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_stats_id_seq', 23, true);


--
-- Name: _home_page_v_version_stats_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._home_page_v_version_stats_locales_id_seq', 46, true);


--
-- Name: _partners_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._partners_page_v_id_seq', 1, false);


--
-- Name: _partners_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._partners_page_v_locales_id_seq', 1, false);


--
-- Name: _partners_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._partners_v_id_seq', 12, true);


--
-- Name: _partners_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._partners_v_locales_id_seq', 24, true);


--
-- Name: _privacy_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._privacy_page_v_id_seq', 2, true);


--
-- Name: _privacy_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._privacy_page_v_locales_id_seq', 3, true);


--
-- Name: _processes_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._processes_v_id_seq', 26, true);


--
-- Name: _processes_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._processes_v_locales_id_seq', 39, true);


--
-- Name: _processes_v_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._processes_v_texts_id_seq', 1, false);


--
-- Name: _product_categories_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._product_categories_v_id_seq', 18, true);


--
-- Name: _product_categories_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._product_categories_v_locales_id_seq', 36, true);


--
-- Name: _product_categories_v_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._product_categories_v_texts_id_seq', 2, true);


--
-- Name: _products_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_page_v_id_seq', 2, true);


--
-- Name: _products_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_page_v_locales_id_seq', 4, true);


--
-- Name: _products_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_id_seq', 46, true);


--
-- Name: _products_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_locales_id_seq', 80, true);


--
-- Name: _products_v_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_rels_id_seq', 98, true);


--
-- Name: _products_v_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_texts_id_seq', 2, true);


--
-- Name: _products_v_version_packaging_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_version_packaging_id_seq', 33, true);


--
-- Name: _products_v_version_packaging_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_version_packaging_locales_id_seq', 66, true);


--
-- Name: _products_v_version_specs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_version_specs_id_seq', 25, true);


--
-- Name: _products_v_version_specs_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._products_v_version_specs_locales_id_seq', 50, true);


--
-- Name: _quote_page_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._quote_page_v_id_seq', 1, false);


--
-- Name: _quote_page_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._quote_page_v_locales_id_seq', 1, false);


--
-- Name: _site_settings_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._site_settings_v_id_seq', 9, true);


--
-- Name: _site_settings_v_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._site_settings_v_locales_id_seq', 18, true);


--
-- Name: _site_settings_v_version_emails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._site_settings_v_version_emails_id_seq', 9, true);


--
-- Name: _site_settings_v_version_phones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._site_settings_v_version_phones_id_seq', 15, true);


--
-- Name: _site_settings_v_version_quote_recipients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._site_settings_v_version_quote_recipients_id_seq', 9, true);


--
-- Name: _site_settings_v_version_socials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._site_settings_v_version_socials_id_seq', 18, true);


--
-- Name: about_page_company_facts_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_company_facts_locales_id_seq', 48, true);


--
-- Name: about_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_id_seq', 1, true);


--
-- Name: about_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_locales_id_seq', 19, true);


--
-- Name: about_page_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_rels_id_seq', 60, true);


--
-- Name: about_page_sectors_items_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_sectors_items_locales_id_seq', 81, true);


--
-- Name: about_page_services_items_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_services_items_locales_id_seq', 36, true);


--
-- Name: about_page_stats_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_stats_locales_id_seq', 36, true);


--
-- Name: about_page_story_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_story_locales_id_seq', 54, true);


--
-- Name: about_page_timeline_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_timeline_locales_id_seq', 52, true);


--
-- Name: about_page_values_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.about_page_values_locales_id_seq', 72, true);


--
-- Name: contact_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contact_page_id_seq', 1, true);


--
-- Name: contact_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contact_page_locales_id_seq', 3, true);


--
-- Name: email_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--



--
-- Name: home_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_page_id_seq', 1, true);


--
-- Name: home_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_page_locales_id_seq', 21, true);


--
-- Name: home_page_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_page_rels_id_seq', 58, true);


--
-- Name: home_page_routes_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_page_routes_locales_id_seq', 294, true);


--
-- Name: home_page_slides_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_page_slides_locales_id_seq', 68, true);


--
-- Name: home_page_stats_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.home_page_stats_locales_id_seq', 74, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 54, true);


--
-- Name: media_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_locales_id_seq', 197, true);


--
-- Name: partners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partners_id_seq', 12, true);


--
-- Name: partners_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partners_locales_id_seq', 60, true);


--
-- Name: partners_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partners_page_id_seq', 1, true);


--
-- Name: partners_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.partners_page_locales_id_seq', 3, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--



--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 10, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 12, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--



--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--



--
-- Name: privacy_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.privacy_page_id_seq', 1, true);


--
-- Name: privacy_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.privacy_page_locales_id_seq', 3, true);


--
-- Name: processes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.processes_id_seq', 13, true);


--
-- Name: processes_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.processes_locales_id_seq', 39, true);


--
-- Name: processes_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.processes_texts_id_seq', 1, false);


--
-- Name: product_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_categories_id_seq', 6, true);


--
-- Name: product_categories_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_categories_locales_id_seq', 54, true);


--
-- Name: product_categories_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_categories_texts_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 26, true);


--
-- Name: products_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_locales_id_seq', 124, true);


--
-- Name: products_packaging_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_packaging_locales_id_seq', 125, true);


--
-- Name: products_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_page_id_seq', 1, true);


--
-- Name: products_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_page_locales_id_seq', 7, true);


--
-- Name: products_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_rels_id_seq', 156, true);


--
-- Name: products_specs_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_specs_locales_id_seq', 118, true);


--
-- Name: products_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_texts_id_seq', 2, true);


--
-- Name: quote_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quote_page_id_seq', 1, true);


--
-- Name: quote_page_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quote_page_locales_id_seq', 3, true);


--
-- Name: redirects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.redirects_id_seq', 1, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 1, true);


--
-- Name: site_settings_locales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.site_settings_locales_id_seq', 25, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--



--
-- PostgreSQL database dump complete
--



--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.1

-- Started on 2022-05-07 16:45:34

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 24720)
-- Name: board; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.board (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    "boardName" character varying NOT NULL,
    description character varying NOT NULL,
    created time with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.board OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24740)
-- Name: boardMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."boardMember" (
    id integer NOT NULL,
    joined time with time zone DEFAULT now() NOT NULL,
    "isAdmin" boolean DEFAULT false,
    "boardId" integer,
    "userId" integer
);


ALTER TABLE public."boardMember" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24749)
-- Name: boardMembers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."boardMember" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."boardMembers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 24738)
-- Name: board_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.board ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- TOC entry 206 (class 1259 OID 24760)
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id integer NOT NULL,
    "eventName" character varying NOT NULL,
    description character varying NOT NULL,
    "startDate" time with time zone NOT NULL,
    "endDate" time with time zone NOT NULL,
    location character varying,
    uuid character varying NOT NULL
);


ALTER TABLE public.event OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 24751)
-- Name: eventAttendee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."eventAttendee" (
    id integer NOT NULL,
    "eventId" integer NOT NULL,
    "userId" integer NOT NULL,
    "isAttending" boolean DEFAULT false NOT NULL,
    "isHost" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."eventAttendee" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24758)
-- Name: eventAttendee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."eventAttendee" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."eventAttendee_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 207 (class 1259 OID 24768)
-- Name: todoItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."todoItem" (
    id integer NOT NULL,
    "itemType" smallint NOT NULL,
    status smallint NOT NULL,
    uuid character varying NOT NULL,
    title character varying NOT NULL,
    due time with time zone,
    updated time with time zone,
    created time with time zone DEFAULT now() NOT NULL,
    completed time with time zone
);


ALTER TABLE public."todoItem" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 24777)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    "passwordHash" character varying NOT NULL,
    created time with time zone DEFAULT now() NOT NULL,
    "displayName" character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 24786)
-- Name: userLogin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."userLogin" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "loginDate" time with time zone DEFAULT now() NOT NULL,
    ip character varying NOT NULL,
    "loginMethod" smallint NOT NULL,
    "userAgent" character varying
);


ALTER TABLE public."userLogin" OWNER TO postgres;

--
-- TOC entry 2896 (class 2606 OID 24748)
-- Name: boardMember boardMembers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."boardMember"
    ADD CONSTRAINT "boardMembers_pkey" PRIMARY KEY (id);


--
-- TOC entry 2893 (class 2606 OID 24730)
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);


--
-- TOC entry 2898 (class 2606 OID 24757)
-- Name: eventAttendee eventAttendee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."eventAttendee"
    ADD CONSTRAINT "eventAttendee_pkey" PRIMARY KEY (id);


--
-- TOC entry 2900 (class 2606 OID 24767)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- TOC entry 2903 (class 2606 OID 24776)
-- Name: todoItem todoItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."todoItem"
    ADD CONSTRAINT "todoItem_pkey" PRIMARY KEY (id);


--
-- TOC entry 2910 (class 2606 OID 24794)
-- Name: userLogin userLogin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userLogin"
    ADD CONSTRAINT "userLogin_pkey" PRIMARY KEY (id);


--
-- TOC entry 2908 (class 2606 OID 24785)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2894 (class 1259 OID 24805)
-- Name: index_board_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_board_uuid ON public.board USING btree (uuid);


--
-- TOC entry 2901 (class 1259 OID 24807)
-- Name: index_event_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_event_uuid ON public.event USING btree (uuid);


--
-- TOC entry 2904 (class 1259 OID 24810)
-- Name: index_user_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_email ON public."user" USING btree (email);


--
-- TOC entry 2905 (class 1259 OID 24809)
-- Name: index_user_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_username ON public."user" USING btree (username);


--
-- TOC entry 2906 (class 1259 OID 24808)
-- Name: index_user_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_uuid ON public."user" USING btree (uuid);


-- Completed on 2022-05-07 16:45:35

--
-- PostgreSQL database dump complete
--


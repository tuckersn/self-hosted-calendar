import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../common/style";
import { ArticleLayout } from "../../components/layouts/ArticleLayout";
import { useUser } from "../../common/hooks/useUser";
import { HomeLoggedIn } from "./pages/HomeLoggedIn";
import { HomeLoggedOut } from "./pages/HomeLoggedOut";



export function HomePage() {

	const [user] = useUser();

	return user === null ? <HomeLoggedOut/> : <HomeLoggedIn/>;
}
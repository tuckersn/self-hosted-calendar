import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../common/style";
import { ArticleLayout } from "../../components/layouts/ArticleLayout";
import { useUser } from "../../shared/hooks/useUser";
import { HomeLoggedIn } from "./components/HomeLoggedIn";
import { HomeLoggedOut } from "./components/HomeLoggedOut";



export function HomePage() {

	const [user] = useUser();

	return user === null ? <HomeLoggedOut/> : <HomeLoggedIn/>;
}
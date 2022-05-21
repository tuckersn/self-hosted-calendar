import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../../common/style";
import { Toggle } from "../../../components/inputs/Toggle";
import { ArticleLayout } from "../../../components/layouts/ArticleLayout";
import { useUser } from "../../../common/hooks/useUser";

const PADDING = "1vh";

const Container = (styled.div`
	height: 100%;
	display: flex;
	padding: ${PADDING};
`);

const HalfOfContainer = (styled.div`
	flex: 50%;
	display: flex;
	flex-direction: column;
	height: 100%;
`);


const PANE_PADDING = 8;
const HalfPane = (styled.div`
	border: 1px solid ${COLORS.border};
	margin: ${PADDING};
	flex: 1;
`);

export function HomeLoggedIn() {

	const [_user] = useUser();
	// Assumes that the user is logged in
	const user = _user!;
	
	return <Container>
		<HalfOfContainer>
			<HalfPane  style={{
				border: "0",
			}}>
				<ArticleLayout title="Home" innerStyle={{
					width: "100%",
					maxWidth: "100%",
					padding: 0
				}}>
					<h1>
						Welcome back {user.displayName}!
					</h1>
					<hr/>
					<p>
						Dashboard here!
					</p>
				</ArticleLayout>
			</HalfPane>
			<HalfPane style={{
			}}>
				Notifications here!
			</HalfPane>
		</HalfOfContainer>
		<HalfOfContainer>
			<HalfPane style={{
			}}>
				Calendar here
			</HalfPane>
			<HalfPane style={{
			}}>
				Todos here

				<Toggle falseComponent={<div>
					FALSE
				</div>} trueComponent={<div>
					TRUE
				</div>}/>
			</HalfPane>
		</HalfOfContainer>
	</Container>;
};
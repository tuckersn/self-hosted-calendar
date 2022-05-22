import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS, CSS_PRESETS, STYLE_VALUES } from "../../../common/style";
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
	border: ${STYLE_VALUES.borderHeavy}px solid ${COLORS.border};
	border-radius: ${STYLE_VALUES.borderRadiusHeavy}px;
	margin: ${PADDING};
	padding: ${STYLE_VALUES.paddingStandardVertical}px;
	padding-left: ${STYLE_VALUES.paddingStandardHorizontal}px;
	padding-right: ${STYLE_VALUES.paddingStandardHorizontal}px;
	flex: 1;
	${CSS_PRESETS.boxShadowDark};
`);

export function HomeLoggedIn() {

	const [_user] = useUser();
	// Assumes that the user is logged in
	const user = _user!;
	
	return <Container>
		<HalfOfContainer>
			<HalfPane  style={{
				border: "0",
				boxShadow: "none"
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

				<Toggle FalseComponent={() => <div>
					FALSE
				</div>} TrueComponent={() => <div>
					TRUE
				</div>}/>
			</HalfPane>
		</HalfOfContainer>
	</Container>;
};
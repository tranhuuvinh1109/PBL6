import { Avatar } from "antd";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { Container, Row } from "react-bootstrap";

const BlogDetail = () => {
	return (
		<Container className="text-left">
			<Row>
				<h4 className="text-4xl font-bold">
					Learn JavaScript while Playing Games — Gamify Your Learning
				</h4>
				<div className="flex justify-between items-center mt-2">
					<div className="flex">
						<Avatar src="https://static-images.vnncdn.net/files/publish/2023/1/3/mu-ngoai-hang-anh-85.jpg" size="large" />
						<div className="ml-2">
							<p className="m-0">
								Trịnh Gia Minh
							</p>
							<p className="m-0">
								6 days ago
							</p>
						</div>
					</div>
					<FontAwesomeIcon icon={ faBookmark } className="text-xl" />
				</div>
				<div className="mt-3 flex justify-center items-center">
					<img src="https://znews-photo.zingcdn.me/w1200/Uploaded/aobhuua/2023_04_13/Dodge_2.jpg" className="w-full md:w-8/12" />
				</div>
				<div className="mt-4">
					Gamification là một giải pháp tốt cho vấn đề này. Nó sử dụng một nỗ lực chiến lược đơn giản để thúc đẩy và thu hút người dùng trong khi tìm hiểu điều gì đó mới. Đó là một kỹ thuật thêm các yếu tố thiết kế điển hình từ các trò chơi để nâng cao quá trình học tập. Điều này được thực hiện bằng cách thúc đẩy mong muốn tự nhiên của mọi người về giao tiếp xã hội, học tập, làm chủ, cạnh tranh, thành tích, địa vị hoặc thể hiện bản thân. Việc triển khai sớm Gamification sử dụng một hệ thống phần thưởng đơn giản cho người chơi sau khi họ hoàn thành nhiệm vụ để thu hút họ. Phần thưởng bao gồm điểm số, huy hiệu thành tích hoặc tiền ảo để sử dụng.
				</div>
			</Row>
		</Container>
	)
}

export default BlogDetail;
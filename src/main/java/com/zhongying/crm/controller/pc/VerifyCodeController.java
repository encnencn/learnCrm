package com.zhongying.crm.controller.pc;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author feng
 * @version 1.15, 2017年5月11日 上午9:59:10
 * 
 */
@Controller
public class VerifyCodeController {

	Random random = new Random();

	@RequestMapping("/defaultKaptcha")
	public void defaultKaptcha(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
			throws Exception {

		byte[] captchaChallengeAsJpeg = null;
		ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
		BufferedImage image = new BufferedImage(75, 34, BufferedImage.TYPE_INT_BGR);
		Graphics2D g = (Graphics2D) image.getGraphics();
		setBackground(g);
		drawRandomLine(g);
		setBorder(g);
		String code = drawRandomString(g);

		httpServletRequest.getSession().setAttribute("verify", code);

		try {
			ImageIO.write(image, "jpg", jpegOutputStream);
			captchaChallengeAsJpeg = jpegOutputStream.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
		}
		httpServletResponse.setHeader("Cache-Control", "no-store");
		httpServletResponse.setHeader("Pragma", "no-cache");
		httpServletResponse.setDateHeader("Expires", 0);
		httpServletResponse.setContentType("image/jpeg");
		ServletOutputStream responseOutputStream = httpServletResponse.getOutputStream();
		responseOutputStream.write(captchaChallengeAsJpeg);
		responseOutputStream.flush();
		responseOutputStream.close();

	}

	// 设置背景色
	public void setBackground(Graphics2D g) {
		g.setColor(Color.white);
		g.fillRect(0, 0, 120, 34);

	}

	// 设置干扰线
	public void drawRandomLine(Graphics2D g) {

		for (int i = 0; i <= 3; i++) {
			int x1 = new Random().nextInt(120);
			int y1 = new Random().nextInt(30);
			int x2 = new Random().nextInt(120);
			int y2 = new Random().nextInt(30);
			g.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));
			g.drawLine(x1, y1, x2, y2);
		}

	}

	// 设置边框
	public void setBorder(Graphics2D g) {

		g.setColor(Color.LIGHT_GRAY);
		g.drawRect(1, 1, 70, 30);

	}

	// 设置验证码文本
	public String drawRandomString(Graphics2D g) {

		String code = "";
		for (int i = 0; i < 4; i++) {
			code += (char) (new Random().nextInt(26) + 65);
		}
		g.setColor(new Color(random.nextInt(255), random.nextInt(255), random.nextInt(255)));

		g.setFont(new Font("仿宋", Font.BOLD, 20));

		g.drawString(code, 13, 24);

		return code;

	}

}

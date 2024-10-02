from django.shortcuts import render
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from django.http import JsonResponse
from .models import ChatHistory
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User


load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))



def get_system_instruction(topic):
    instructions = {
        "sorting":"You are an AI teaching assistant designed to help students learn the basic concepts of sorting using the Socratic teaching method. \nYour role is to guide the student to their own understanding of sorting by asking a series of probing questions. \nThe student should arrive at their own conclusions with your guidance. Do not reveal the answers directly.\n\nFor this session, focus on the foundational concepts of sorting:\n1. Elicit what the student already knows about sorting.\n2. Encourage them to explain why sorting is important in computer science.\n3. Help them think critically about where and why sorting is applied in real-world scenarios.\n\nFollow this structure based on their responses:\n- Stage 1: Understanding what sorting is (What does it mean to sort a list? Can you give an example?).\n- Stage 2: Importance of sorting (Why do we need sorting? What problems does sorting solve?).\n- Stage 3: Applications of sorting (Where have you seen sorting used in real life or programming?).\n\nAsk one question at a time and use follow-up questions to explore the student’s understanding more deeply.\nFor example, if the student mentions that sorting is used to organize items, follow up by asking how it helps in specific cases like searching or organizing data structures. \nIf the student struggles, rephrase the question or simplify it without giving away the answer.",
        "bubble sort":"You are an AI teaching assistant designed to help students learn sorting algorithms, specifically Bubble Sort, using the Socratic teaching method. \nYour role is to guide the student to their own understanding of the material by asking a series of probing questions at different stages of understanding. \nThe student should arrive at their own conclusions with your guidance. Do not reveal the answers directly.\n\nFor each stage of understanding, ask questions that:\n1. Elicit what the student already knows.\n2. Encourage them to explain the logic behind their statements.\n3. Challenge them to think critically about the algorithm's steps, time complexity, and potential optimizations.\n\nFollow this structure based on their responses:\n- Stage 1: Understanding Bubble Sort mechanics (How does Bubble Sort work?).\n- Stage 2: Algorithm efficiency (What is the time complexity of Bubble Sort?).\n- Stage 3: Debugging and optimization (How can Bubble Sort be improved or optimized?).\n\nAsk one question at a time and use follow-up questions to explore the student's understanding deeper.\nFor example, if the student explains Bubble Sort, follow up by asking how the algorithm behaves when the list is already sorted or how they would describe its efficiency.\nIf a student struggles, rephrase the question or simplify it without giving away the answer.",
        "selection sort":"You are an AI teaching assistant designed to help students learn sorting algorithms, specifically Selection Sort, using the Socratic teaching method. \nYour role is to guide the student to their own understanding of the material by asking a series of probing questions at different stages of understanding. \nThe student should arrive at their own conclusions with your guidance. Do not reveal the answers directly.\n\nFor each stage of understanding, ask questions that:\n1. Elicit what the student already knows.\n2. Encourage them to explain the logic behind their statements.\n3. Challenge them to think critically about the algorithm's steps, time complexity, and potential optimizations.\n\nFollow this structure based on their responses:\n- Stage 1: Basic sorting concepts (What is sorting? Why is it necessary?).\n- Stage 2: Understanding Selection Sort mechanics (How does Selection Sort work?).\n- Stage 3: Algorithm efficiency (What is the time complexity of Selection Sort?).\n- Stage 4: Debugging and optimization (How can Selection Sort be improved or optimized?).\n\nAsk one question at a time and use follow-up questions to explore the student's understanding deeper.\nFor example, if the student explains Selection Sort, follow up by asking how the algorithm behaves when the list is already sorted or how they would describe its efficiency.\nIf a student struggles, rephrase the question or simplify it without giving away the answer.",
    }

    return instructions.get(topic, "You are an AI teaching assistant for DSA topics.")

def list_topics(request):
    topics = ["sorting",
              "bubble sort",
              "selection sort",]
    
    return JsonResponse({'topics':topics})


@csrf_exempt
def chat_view(request):
    if request.method == 'POST':
        # Parse the JSON body
        body = json.loads(request.body)
        user_input = body.get('message')  # Get the message from the JSON body
        topic = body.get('topic', 'bubblesort')

        if not user_input:  # Check if user_input is empty
            return JsonResponse({'error': 'Message cannot be empty'}, status=400)

        system_instruction = get_system_instruction(topic)

        generation_config = {
            "temperature": 0.65,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        }

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
            system_instruction=system_instruction
        )
        
        chat_history = ChatHistory.objects.filter(user_id=request.user.id, topic=topic).first()
        if chat_history:
            history = chat_history.history
        else:
            history = []

        chat_session = model.start_chat(history=history)
        response = chat_session.send_message(user_input)
        model_response = response.text

        history.append({'role': 'user', 'parts': [user_input]})
        history.append({'role': 'model', 'parts': [model_response]})

        if chat_history:
            chat_history.history = history
            chat_history.save()
        else:
            ChatHistory.objects.create(user_id=request.user.id, topic=topic, history=history)

        return JsonResponse({'response': model_response})

    return JsonResponse({'error': 'Invalid Request'}, status=400)


@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        # Parse the JSON body
        body = json.loads(request.body)

        # Extract user details
        first_name = body.get('first_name')
        last_name = body.get('last_name')
        email = body.get('email')
        password = body.get('password')

        # Create a new user
        try:
            user = User.objects.create_user(
                username=email,  # Use email as username
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password
            )
            user.save()
            return JsonResponse({"message": "User created successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)

